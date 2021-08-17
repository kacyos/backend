import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { PropostaModule } from './proposta/proposta.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuarioModule, AuthModule, PropostaModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
