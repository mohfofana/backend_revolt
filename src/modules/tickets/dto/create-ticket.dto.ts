import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';

type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Titre du ticket',
    example: 'Problème de connexion',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Description détaillée du problème',
    example: 'Je ne parviens pas à me connecter à mon compte',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: 'Priorité du ticket',
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority?: 'low' | 'medium' | 'high' | 'critical';

  @ApiProperty({
    description: 'Catégorie du ticket',
    example: 'Authentification',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'ID du responsable du ticket',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  assignedToId?: number;

  @ApiProperty({ 
    description: 'Tags associés au ticket', 
    example: ['bug', 'urgent', 'frontend'],
    type: [String],
    required: false, 
  })
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
