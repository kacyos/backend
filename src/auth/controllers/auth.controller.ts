import {
  Request,
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Get } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.createUser(createUserDto);
  }

  /*
  @Post()
  async logout(): void {}
  */

  //@UseGuards(JwtAuthGuard)
  @Get(':acces/verify')
  validateToken(@Param('acces') acces: any): any {
    //console.log(acces);
    return this.authService.validateToken(acces);
  }
}
