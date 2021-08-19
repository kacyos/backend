import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('/users')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usuarioService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.usuarioService.login(req.user);
  }
}
