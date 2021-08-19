import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new BadRequestException({
        status: 400,
        error: 'Email já cadastrado',
      });
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      access_token: this.jwtService.sign({ email: createUserDto.email }),
    });

    const user = await this.userRepository.save(newUser);

    const { public_id, name, email, access_token } = user;

    return {
      user: { public_id, name, email },
      access_token
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
