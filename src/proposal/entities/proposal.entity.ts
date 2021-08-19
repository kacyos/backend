import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Loads } from './loads.entity';

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
export class Proposal {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Generated('uuid')
  @Column()
  public_id: string;

  @Column('date')
  data_inicio: string;

  @Column('date')
  data_fim: string;

  @OneToMany(() => Loads, (cargas: Loads) => cargas.proposta, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  cargas: Loads[];

  @Column('enum', { enum: FonteEnergia })
  fonte_energia: string;

  @Column('enum', { enum: Submercado })
  submercado: string;

  @Column('boolean', { default: false })
  contratado: boolean;

  @Column('numeric')
  consumo_total: number;

  @Column('numeric')
  valor_proposta: number;

  @ManyToOne(() => User, (usuario: User) => usuario.proposta, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  @JoinColumn()
  usuario: User;
}
