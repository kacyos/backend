import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async findOne(t): Promise<Usuario | null> {
    const usuario = await this.userRepository.findOne(t);
    console.log(t);
    console.log(usuario);
    return usuario;
  }

  async login(loginDto: LoginDto) {
    const payload = { email: loginDto.email };

    const resposta = {
      user: {
        ...loginDto,
      },
      access_token: this.jwtService.sign(payload),
    };
    return resposta;
  }

  async create(createUserDto: CreateUserDto) {
    const usuarioExiste = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (usuarioExiste) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Email já cadastrado`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const novoUsuario: Usuario = this.userRepository.create({
      ...createUserDto,
      access_token: this.jwtService.sign({ email: createUserDto.email }),
    });

    const usuario: Usuario = await this.userRepository.save(novoUsuario);

    const resposta = {
      user: {
        public_id: usuario.public_id,
        name: usuario.name,
        email: usuario.email,
      },
      access_token: usuario.access_token,
    };

    return resposta;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
