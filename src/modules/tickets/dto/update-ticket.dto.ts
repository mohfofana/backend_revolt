import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';
import { TicketStatus } from '../ticket.entity';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty({
    description: 'Nouveau statut du ticket',
    enum: ['open', 'pending', 'closed'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['open', 'pending', 'closed'])
  status?: 'open' | 'pending' | 'closed';
}
