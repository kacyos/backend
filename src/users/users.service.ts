import { Injectable } from '@nestjs/common'
import {
  getConnectionToken,
  getRepositoryToken,
  InjectRepository
} from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser: User = this.userRepository.create({
      public_id: randomUUID(),
      access_token: randomUUID(),
      ...createUserDto
    })

    this.userRepository.save(newUser)

    const response = {
      user: {
        public_id: newUser.public_id,
        name: newUser.name,
        email: newUser.email
      },
      access_token: newUser.access_token
    }

    return response
  }

  findAll() {
    return this.userRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
