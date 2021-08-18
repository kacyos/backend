import { Exclude } from 'class-transformer';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Cargas, (cargas: Cargas) => cargas.proposta, {
    cascade: true,
    orphanedRowAction: 'delete',
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

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.proposta, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
