import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity()
export class Cargas {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar')
  nome_empresa: string;

  @Column('numeric')
  consumo_kwh: number;

  @ManyToOne(() => Proposta, (proposta: Proposta) => proposta.cargas, {
    onDelete: 'CASCADE',
  })
  proposta: Proposta;
}
