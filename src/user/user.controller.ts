import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UserController {
  constructor(private usuarioService: UserService) {}

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
