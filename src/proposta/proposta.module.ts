import { Module } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { PropostaController } from './proposta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposta } from './entities/proposta.entity';
import { Cargas } from './entities/cargas.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Proposta, Cargas])],
  controllers: [PropostaController],
  providers: [PropostaService],
})
export class PropostaModule {}
