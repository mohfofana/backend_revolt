import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type TicketStatus = 'open' | 'pending' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

@Entity('tickets')
export class Ticket {
  @ApiProperty({ description: 'ID unique du ticket', example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'Titre du ticket', example: 'Problème de connexion' })
  @Column({ length: 255 })
  title!: string;

  @ApiProperty({ description: 'Description détaillée du problème', example: 'Je ne parviens pas à me connecter à mon compte' })
  @Column('text')
  description!: string;

  @ApiProperty({ 
    description: 'Statut actuel du ticket', 
    enum: ['open', 'pending', 'closed'],
    example: 'open' 
  })
  @Column({ type: 'varchar', length: 20, default: 'open' })
  status!: TicketStatus;

  @ApiProperty({ 
    description: 'Priorité du ticket', 
    enum: ['low', 'medium', 'high', 'critical'],
    example: 'medium' 
  })
  @Column({ type: 'varchar', length: 20, default: 'medium' })
  priority!: TicketPriority;

  @ApiProperty({ 
    description: 'Nom de la personne assignée au ticket', 
    example: 'John Doe',
    required: false 
  })
  @Column({ nullable: true })
  assignee?: string;

  @ApiProperty({ 
    description: 'Catégorie du ticket', 
    example: 'Authentification',
    required: false 
  })
  @Column({ nullable: true })
  category?: string;

  @ApiProperty({ 
    description: 'Tags associés au ticket', 
    example: ['bug', 'frontend'],
    type: [String],
    required: false 
  })
  @Column('simple-array', { nullable: true })
  tags?: string[];

  @ApiProperty({ description: 'Date de création du ticket', type: Date })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour du ticket', type: Date })
  @UpdateDateColumn()
  updatedAt!: Date;
}
