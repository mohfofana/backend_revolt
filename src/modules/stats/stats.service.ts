import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from '../tickets/ticket.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async getStats() {
    // Compter les tickets par statut
    const [openTickets, closedTickets, pendingTickets] = await Promise.all([
      this.ticketRepository.count({ where: { status: 'open' as TicketStatus } }),
      this.ticketRepository.count({ 
        where: [
          { status: 'closed' as TicketStatus }
        ]
      }),
      this.ticketRepository.count({ where: { status: 'pending' as TicketStatus } })
    ]);
    
    return {
      openTickets,
      closedTickets,
      pendingTickets,
    };
  }
}
