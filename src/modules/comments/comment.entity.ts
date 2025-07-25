import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  authorName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Ticket, ticket => ticket.id, { onDelete: 'CASCADE' })
  ticket!: Ticket;
}
