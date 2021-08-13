import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly public_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  access_token: string;
}
