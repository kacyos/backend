import { Module } from '@nestjs/common';
import { PropostaModule } from './proposta/proposta.module';

@Module({
  imports: [PropostaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
