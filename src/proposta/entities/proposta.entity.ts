import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum FonteEnergia {
  CONVENCIONAL = "CONVENCIONAL",
  RENOVAVEL = "RENOVAVEL"
}

enum Submercado {
  NORTE = "NORTE",
  NORDESTE = "NORDESTE",
  SUL = "SUL",
  SUDESTE= "SUDESTE"
}

class Cargas {
  @Column('varchar')
  name_empresa: string;

  @Column('numeric')
  consumo_kwh: number;
}

@Entity()
export class Proposta {
  @PrimaryGeneratedColumn('uuid')
  readonly public_id: string;

  @Column('varchar')
  access_token: string;

  @Column('date')
  data_inicio: string;

  @Column('date')
  data_fim: string;

  @Column(() => Cargas)
  cargas: Cargas[];

  @Column('enum', { enum: FonteEnergia })
  fonte_energia: FonteEnergia

  @Column('enum', { enum: Submercado })
  submercado: Submercado

  @Column('boolean')
  contratado: boolean;

  @Column('numeric')
  valor_proposta: number;

}


