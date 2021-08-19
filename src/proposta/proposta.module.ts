import { Module } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { PropostaController } from './proposta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposta } from './entities/proposta.entity';
import { Cargas } from './entities/cargas.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { jwtConstants } from 'src/auth/constants';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsuarioModule,
    TypeOrmModule.forFeature([Proposta, Cargas]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [PropostaController],
  providers: [PropostaService],
})
export class PropostaModule { }
