import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDateString,
  ValidateNested,
  Validate,
  ArrayNotEmpty,
  IsPositive,
  IsEnum,
  IsBoolean
} from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isGreaterThan', async: false })
class DataFimConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return value > args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return '$property deve ser maior que $constraint1';
  }
}

export enum FonteEnergia {
  CONVENCIONAL = 'CONVENCIONAL',
  RENOVAVEL = 'RENOVAVEL',
}

export enum Submercado {
  NORTE = 'NORTE',
  NORDESTE = 'NORDESTE',
  SUL = 'SUL',
  SUDESTE = 'SUDESTE',
}

class Loads {
  @IsString({ message: '$property deve ser uma string' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  nome_empresa: string;

  @IsPositive({ message: '$property deve ser um número positivo' })
  @IsInt({ message: '$property deve ser um número inteiro' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  consumo_kwh: number;
}

export class CreateProposalDto {
  @IsDateString(null, { message: '$property deve ser uma data ISO 8601 válida' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  data_inicio: string;

  @Validate(DataFimConstraint, ['data_inicio'])
  @IsDateString(null, { message: '$property deve ser uma data ISO 8601 válida' })
  @IsNotEmpty({ message: '$property não pode ser vazio' })
  data_fim: string;

  @ValidateNested()
  @ArrayNotEmpty({ message: '$property não pode ser vazio' })
  @Type(() => Loads)
  cargas: Loads[];

  @IsEnum(FonteEnergia, { message: '$property deve ser um enum válido (CONVENCIONAL | RENOVAVEL) ' })
  fonte_energia: string;

  @IsEnum(Submercado, { message: '$property deve ser um enum válido (NORTE | NORDESTE | SUL | SUDESTE)' })
  submercado: string;

  @IsBoolean({ message: '$property deve ser um boolean' })
  contratado = false;

  consumo_total: number;

  valor_proposta: number;
}
