import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'O nome deve conter no mínimo 3 caracteres' })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @MinLength(8, { message: 'A senha deve conter no mínimo 8 caracteres' })
  @IsString()
  readonly password: string;
}
