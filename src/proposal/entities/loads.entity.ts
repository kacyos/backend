import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proposal } from './proposal.entity';

@Entity()
export class Loads {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar')
  nome_empresa: string;

  @Column('numeric')
  consumo_kwh: number;

  @ManyToOne(() => Proposal, (proposta: Proposal) => proposta.cargas, {
    onDelete: 'CASCADE',
  })
  proposta: Proposal;
}
