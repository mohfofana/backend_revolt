import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @Column()
  originalName!: string;

  @Column()
  mimetype!: string;

  @Column()
  size!: number;

  @Column()
  path!: string;

  @CreateDateColumn()
  uploadedAt!: Date;

  @ManyToOne(() => Ticket, ticket => ticket.id, { onDelete: 'CASCADE' })
  ticket!: Ticket;
}
