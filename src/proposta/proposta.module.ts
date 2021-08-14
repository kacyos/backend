import { Module } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { PropostaController } from './proposta.controller';

@Module({
  controllers: [PropostaController],
  providers: [PropostaService]
})
export class PropostaModule {}
