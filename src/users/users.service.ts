import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (!!userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Usuário já cadastrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = this.userRepository.create({
      access_token: randomUUID(),

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

  findAll() {
    return this.userRepository.find({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  auth(token: string): Promise<User | any> {
    return this.userRepository.findOne({ access_token: token });
  }
}
