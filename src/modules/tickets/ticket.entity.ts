import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'varchar', length: 20, default: 'open' })
  status!: TicketStatus;

  @Column({ type: 'varchar', length: 20, default: 'medium' })
  priority!: TicketPriority;

  @Column({ nullable: true })
  assignee?: string;

  @Column({ nullable: true })
  category?: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
