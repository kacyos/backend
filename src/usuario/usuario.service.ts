import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) { }

  findOne(email: string): Promise<Usuario> {
    return this.userRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const usuarioExiste = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (usuarioExiste) {
      throw new BadRequestException({
        status: 400,
        error: 'Email já cadastrado',
      });
    }

    const novoUsuario = this.userRepository.create({
      ...createUserDto,
      access_token: this.jwtService.sign({ email: createUserDto.email }),
    });

    const usuario = await this.userRepository.save(novoUsuario);

    return {
      user: {
        public_id: usuario.public_id,
        name: usuario.name,
        email: usuario.email,
      },
      access_token: usuario.access_token,
    };
  }

  async login(user: any) {
    const { public_id, name, email } = user;

    return {
      user: {
        public_id,
        name,
        email,
      },
      access_token: this.jwtService.sign({ email }),
    }
  }

}
