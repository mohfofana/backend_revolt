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
    // Compter les tickets par statut
    const [openTickets, closedTickets, pendingTickets] = await Promise.all([
      this.ticketRepository.count({ where: { status: 'open' } }),
      this.ticketRepository.count({ 
        where: [
          { status: 'closed' },
          { status: 'resolved' } // Inclure les tickets résolus dans les fermés
        ]
      }),
      this.ticketRepository.count({ where: { status: 'in_progress' } })
    ]);
    
    return {
      openTickets,
      closedTickets,
      pendingTickets,
    };
  }
}
