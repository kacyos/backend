import { Module } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { PropostaController } from './proposta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposta } from './entities/proposta.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Proposta])],
  controllers: [PropostaController],
  providers: [PropostaService]
})
export class PropostaModule {}
