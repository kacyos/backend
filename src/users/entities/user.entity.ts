import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public_id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  access_token: string
}
