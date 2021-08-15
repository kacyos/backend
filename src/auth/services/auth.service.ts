import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Email já cadastrado`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = this.userRepository.create({
      access_token: this.jwtService.sign({
        public_id: createUserDto.email,
      }),
      ...createUserDto,
    });

    const newUser: User = await this.userRepository.save(user);

    const response = {
      user: {
        public_id: newUser.public_id,
        name: newUser.name,
        email: newUser.email,
      },
      access_token: newUser.access_token,
    };
    return response;
  }

  async login(user: LoginDto) {
    return user;
  }

  async validateToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      return false;
    }

    if (user.email === email && bcrypt.compareSync(password, user.password)) {
      const token = this.jwtService.sign({ email: user.email });
      console.log(token);
      const response = {
        user: {
          public_id: user.public_id,
          name: user.name,
          email: user.email,
        },
        access_token: token,
      };

      return response;
    }
  }
}
