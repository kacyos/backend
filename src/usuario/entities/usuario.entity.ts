import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Proposta } from 'src/proposta/entities/proposta.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Generated('uuid')
  @Column()
  public_id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Proposta, (proposta: Proposta) => proposta.usuario, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  proposta: Proposta[];

  @Column({ type: 'varchar' })
  access_token: string;
}
