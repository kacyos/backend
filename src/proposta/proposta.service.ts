import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Repository } from 'typeorm';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { Proposta } from './entities/proposta.entity';
@Injectable()
export class PropostaService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private usuarioService: UsuarioService,
  ) {}

  async create(createPropostaDto: CreatePropostaDto, token: string) {
    try {
      createPropostaDto.valor_proposta = calcularProposta(createPropostaDto);

      const [_, Token] = token.split(' ');

      const usuario = await this.usuarioService.findOne({
        access_token: Token,
      });

      const proposta = this.propostaRepository.create({
        ...createPropostaDto,
        cargas: createPropostaDto.cargas,
        contratado: false,
        usuario: usuario,
      });

      const novaProposta: Proposta = await this.propostaRepository.save(
        proposta,
      );

      return classToPlain(novaProposta, { exposeDefaultValues: true });
    } catch (error) {
      return error;
    }
  }

  async findAll(token: string) {
    const [_, Token] = token.split(' ');

    const usuario = await this.usuarioService.findOne({
      access_token: Token,
      relations: ['proposta'],
    });

    /*const propostas = this.usuarioService.find(usuario.id, {
      relations: ['cargas'],
    });*/
    return classToPlain(usuario, { exposeDefaultValues: true });
  }

  async contratarProposta(id: string) {
    try {
      const proposta = await this.propostaRepository.findOne(
        { public_id: id },
        {
          relations: ['cargas'],
        },
      );

      if (!proposta) {
        return [];
      }

      proposta.contratado = true;

      const propostaContratada = this.propostaRepository.save(proposta);

      return classToPlain(propostaContratada, { exposeDefaultValues: true });
    } catch (erro) {
      return erro.message;
    }
  }

  async excluirProposta(id: string) {
    await this.propostaRepository.delete({ public_id: id });
  }

  // update(id: number, updatePropostaDto: UpdatePropostaDto) {
  //   return `This action updates a #${id} proposta`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} proposta`;
  // }
}

function calcularProposta(proposta) {
  const { data_inicio, data_fim, cargas, fonte_energia, submercado } = proposta;

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

  //soma o consumo_kwh de todas as cargas
  const consumo_kwh = cargas.reduce((acc, curr) => acc + curr.consumo_kwh, 0);

  //calcula o valor da proposta
  return consumo_kwh * periodo * (preco_kwh + preco_submercado + preco_fonte);
}
