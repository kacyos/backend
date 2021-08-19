import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: '$property deve conter no mínimo 3 caracteres' })
  readonly name: string;

  @IsEmail({}, { message: '$property é inválido' })
  readonly email: string;

  @IsString()
  @MinLength(8, { message: '$property deve conter no mínimo 8 caracteres' })
  readonly password: string;
}
