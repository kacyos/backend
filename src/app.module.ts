import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaModule } from './proposta/proposta.module';

@Module({
  imports: [
    PropostaModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
