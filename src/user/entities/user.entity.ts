import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Proposal } from 'src/proposal/entities/proposal.entity';

@Entity()
export class User {
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

  @OneToMany(() => Proposal, (proposta: Proposal) => proposta.usuario, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  proposta: Proposal[];

  @Column({ type: 'varchar' })
  access_token: string;
}
