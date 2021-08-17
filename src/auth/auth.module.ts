import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsuarioModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
