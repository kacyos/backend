import { Injectable } from '@nestjs/common';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';

@Injectable()
export class PropostaService {
  create(createPropostaDto: CreatePropostaDto) {
    createPropostaDto.valor_proposta = calcularProposta(createPropostaDto);
    return createPropostaDto;
  }

  // findAll() {
  //   return `This action returns all proposta`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} proposta`;
  // }

  // update(id: number, updatePropostaDto: UpdatePropostaDto) {
  //   return `This action updates a #${id} proposta`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} proposta`;
  // }
}

function calcularProposta(proposta) {
  const { data_inicio, data_fim, cargas, fonte_energia, submercado } = proposta;

  let regioes = {
        NORTE: 2,
        NORDESTE: -1,
        SUL: 3.50,
        SUDESTE: 1.50
      },
      fontes = {
        CONVENCIONAL: 5,
        RENOVAVEL: -2
      },
      preco_kwh = 10,
      preco_submercado = regioes[submercado],
      preco_fonte = fontes[fonte_energia];

  //transforma as datas de string para objeto Date
  let inicio = new Date(data_inicio) as any,
      fim = new Date(data_fim) as any;

  //calcula o período da proposta em milissegundos
  let milissegundos = fim - inicio;

  //converte milissegundos para horas
  let periodo = milissegundos / (1000 * 60 * 60);

  //soma o consumo_kwh de todas as cargas
  let consumo_kwh = cargas.reduce((acc, curr) => acc + curr.consumo_kwh, 0);
  
  //calcula o valor da proposta
  return consumo_kwh * periodo * (preco_kwh + preco_submercado + preco_fonte);
}
