import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cargas } from './cargas.entity';

enum FonteEnergia {
  CONVENCIONAL = 'CONVENCIONAL',
  RENOVAVEL = 'RENOVAVEL',
}

enum Submercado {
  NORTE = 'NORTE',
  NORDESTE = 'NORDESTE',
  SUL = 'SUL',
  SUDESTE = 'SUDESTE',
}

@Entity()
export class Proposta {
  @PrimaryGeneratedColumn('increment')
  readonly public_id: string;

  @Column('date')
  data_inicio: string;

  @Column('date')
  data_fim: string;

  @JoinTable()
  @ManyToMany(() => Cargas, (cargas: Cargas) => cargas.proposta, {
    cascade: true,
  })
  cargas: Cargas[];

  @Column('enum', { enum: FonteEnergia })
  fonte_energia: string;

  @Column('enum', { enum: Submercado })
  submercado: string;

  @Column('boolean')
  contratado: boolean;

  @Column('numeric')
  valor_proposta: number;
}
