import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket, TicketStatus } from './ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('assignee') assignee?: string,
    @Query('category') category?: string,
    @Query('tags') tags?: string,
  ): Promise<Ticket[]> {
    return this.ticketsService.findAll({ status, priority, assignee, category, tags });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.ticketsService.findOneEnriched(Number(id));
  }

  @Post()
  create(@Body() data: Partial<Ticket>): Promise<Ticket> {
    return this.ticketsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Ticket>): Promise<Ticket> {
    return this.ticketsService.update(Number(id), data);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string, 
    @Body('status') status: TicketStatus
  ): Promise<Ticket> {
    return this.ticketsService.update(Number(id), { status });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketsService.remove(Number(id));
  }
}
