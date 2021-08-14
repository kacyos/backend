import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsArray, IsDateString, ValidateNested, Validate, ArrayNotEmpty, IsPositive, IsEnum, IsBoolean, IsDate,  } from 'class-validator';
// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// @ValidatorConstraint({ name: 'data_fim', async: false })
// class DataFimValidation implements ValidatorConstraintInterface {
//   validate(text: string, args: ValidationArguments) {
//     console.log(args);
//     return true
//   }

//   defaultMessage(args: ValidationArguments) {
//     // here you can provide default error message if validation failed
//     return 'Text ($value) is too short or too long!';
//   }
// }

export enum FonteEnergia {
  CONVENCIONAL = "CONVENCIONAL",
  RENOVAVEL = "RENOVAVEL"
}

export enum Submercado {
  NORTE = "NORTE",
  NORDESTE = "NORDESTE",
  SUL = "SUL",
  SUDESTE= "SUDESTE"
}

class Cargas {
  @IsString()
  @IsNotEmpty()
  nome_empresa: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  consumo_kwh: number;
}

export class CreatePropostaDto {
  @IsDateString(null, {message: "$property deve ser uma data ISO 8601 válida"} )
  @IsNotEmpty({ message: "$property não pode ser vazio" })
  data_inicio: string;

  // @Validate(DataFimValidation)
  @IsDateString(null, {message: "$property deve ser uma data ISO 8601 válida"} )
  @IsNotEmpty({ message: "$property não pode ser vazio" })
  data_fim: string;

  @ValidateNested()
  @ArrayNotEmpty({ message: "$property deve conter ao menos 1 carga" })
  @Type(() => Cargas)
  cargas: Cargas[];

  @IsEnum(FonteEnergia, { message: "$property deve ser um enum válido (CONVENCIONAL | RENOVAVEL) "})
  fonte_energia: string;

  @IsEnum(Submercado, { message: "$property deve ser um enum válido (NORTE | NORDESTE | SUL | SUDESTE)"})
  submercado: string;

  @IsBoolean({ message: "$property deve ser um boolean" })
  contratado: boolean = false;

  valor_proposta: number;
}

