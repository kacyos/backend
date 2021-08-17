import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';

export class LoginDto extends PartialType(CreateUserDto) {}
