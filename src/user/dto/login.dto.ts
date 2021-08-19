import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class LoginDto extends PartialType(CreateUserDto) {}
