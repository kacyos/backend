import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity()
export class Cargas {
  @PrimaryGeneratedColumn('increment')
  public_id: string;

  @Column('varchar')
  nome_empresa: string;

  @Column('numeric')
  consumo_kwh: number;

  @ManyToMany(() => Proposta, (proposta: Proposta) => proposta.cargas)
  proposta: Proposta[];
}
