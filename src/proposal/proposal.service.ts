import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { Proposal } from './entities/proposal.entity';
import jwt_decode from "jwt-decode";
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
    private userService: UserService,
  ) { }

  async create(createProposalDto: CreateProposalDto, token: string) {
    createProposalDto.consumo_total = createProposalDto.cargas.reduce((acc, curr) => acc + curr.consumo_kwh, 0);
    createProposalDto.valor_proposta = this._calculateProposal(createProposalDto);

    let { email } = jwt_decode(token) as any;

    const user = await this.userService.findOne(email);

    const proposal = this.proposalRepository.create({
      ...createProposalDto,
      usuario: user,
    });

    const newProposal = await this.proposalRepository.save(proposal);

    return classToPlain(newProposal);
  }

  async findAll(token: string) {
    let { email } = jwt_decode(token) as any;

    const user = await this.userService.findOne(email);

    const proposals = await this.proposalRepository.find({
      relations: ['cargas'],
      where: { usuario: user }
    });

    return classToPlain(proposals);
  }

  async hire(id: string, token: string) {
    let { email } = jwt_decode(token) as any;

    const user = await this.userService.findOne(email);

    const proposal = await this.proposalRepository.findOne({
      relations: ['cargas'],
      where: { usuario: user, public_id: id }
    });

    if (!proposal) {
      throw new NotFoundException({
        status: 404,
        error: "Proposta não encontrada",
      });
    }

    if (proposal.contratado === true) {
      throw new BadRequestException({
        status: 400,
        error: "Proposta já contratada",
      });
    }

    proposal.contratado = true;

    await this.proposalRepository.save(proposal);

    return classToPlain(proposal);
  }

  async remove(id: string, token: string) {
    let { email } = jwt_decode(token) as any;

    const user = await this.userService.findOne(email);

    const proposal = await this.proposalRepository.findOne({
      where: { usuario: user, public_id: id }
    });

    if (!proposal) {
      throw new NotFoundException({
        status: 404,
        error: "Proposta não encontrada",
      });
    }

    return await this.proposalRepository.delete({ public_id: id });
  }

  private _calculateProposal(proposal) {
    const { data_inicio, data_fim, fonte_energia, submercado, consumo_total } = proposal;

    const regions = {
      NORTE: 2,
      NORDESTE: -1,
      SUL: 3.5,
      SUDESTE: 1.5,
    },
    source = {
      CONVENCIONAL: 5,
      RENOVAVEL: -2,
    },
    kwh_price = 10,
    region_price = regions[submercado],
    source_price = source[fonte_energia];

    //transforma as datas de string para objeto Date
    const begin = new Date(data_inicio) as any,
      end = new Date(data_fim) as any;

    //calcula o período da proposta em milissegundos
    const milliseconds = end - begin;

    //converte milissegundos para horas
    const period_hours = milliseconds / (1000 * 60 * 60);

    //calcula o valor da proposta
    return consumo_total * period_hours * (kwh_price + region_price + source_price);
  }
}