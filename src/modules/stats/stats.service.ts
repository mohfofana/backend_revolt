import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async getStats() {
    const openTickets = await this.ticketRepository.count({ where: { status: 'open' } });
    const closedTickets = await this.ticketRepository.count({ where: { status: 'closed' } });
    const pendingTickets = await this.ticketRepository.count({ where: { status: 'in_progress' } });
    return {
      openTickets,
      closedTickets,
      pendingTickets,
    };
  }
}
