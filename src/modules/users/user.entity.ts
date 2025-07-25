import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'admin' | 'agent' | 'user';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 20, default: 'user' })
  role!: UserRole;
}
