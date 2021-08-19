import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { Proposta } from './entities/proposta.entity';
import jwt_decode from "jwt-decode";
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class PropostaService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private usuarioService: UsuarioService,
  ) { }

  async create(createPropostaDto: CreatePropostaDto, token: string) {
    createPropostaDto.consumo_total = createPropostaDto.cargas.reduce((acc, curr) => acc + curr.consumo_kwh, 0);
    createPropostaDto.valor_proposta = this._calcularProposta(createPropostaDto);

    let { email } = jwt_decode(token) as any;

    const usuario = await this.usuarioService.findOne(email);

    const proposta = this.propostaRepository.create({
      ...createPropostaDto,
      usuario: usuario,
    });

    const novaProposta = await this.propostaRepository.save(proposta);

    return classToPlain(novaProposta);
  }

  async findAll(token: string) {
    let { email } = jwt_decode(token) as any;

    const usuario = await this.usuarioService.findOne(email);

    const propostas = await this.propostaRepository.find({
      relations: ['cargas'],
      where: { usuario: usuario }
    });

    return classToPlain(propostas);
  }

  async contratarProposta(id: string, token: string) {
    let { email } = jwt_decode(token) as any;

    const usuario = await this.usuarioService.findOne(email);

    const proposta = await this.propostaRepository.findOne({
      relations: ['cargas'],
      where: { usuario: usuario, public_id: id }
    });

    if (!proposta) {
      throw new NotFoundException({
        status: 404,
        error: "Proposta não encontrada",
      });
    }

    if (proposta.contratado === true) {
      throw new BadRequestException({
        status: 400,
        error: "Proposta já contratada",
      });
    }

    proposta.contratado = true;

    await this.propostaRepository.save(proposta);

    return classToPlain(proposta);
  }

  async remove(id: string) {
    return await this.propostaRepository.delete({ public_id: id });
  }

  private _calcularProposta(proposta) {
    const { data_inicio, data_fim, fonte_energia, submercado, consumo_total } = proposta;
  
    const regioes = {
      NORTE: 2,
      NORDESTE: -1,
      SUL: 3.5,
      SUDESTE: 1.5,
    },
      fontes = {
        CONVENCIONAL: 5,
        RENOVAVEL: -2,
      },
      preco_kwh = 10,
      preco_submercado = regioes[submercado],
      preco_fonte = fontes[fonte_energia];
  
    //transforma as datas de string para objeto Date
    const inicio = new Date(data_inicio) as any,
      fim = new Date(data_fim) as any;
  
    //calcula o período da proposta em milissegundos
    const milissegundos = fim - inicio;
  
    //converte milissegundos para horas
    const periodo = milissegundos / (1000 * 60 * 60);
  
    //calcula o valor da proposta
    return consumo_total * periodo * (preco_kwh + preco_submercado + preco_fonte);
  }
}