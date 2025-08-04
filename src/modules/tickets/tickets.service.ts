import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(filters: any = {}): Promise<Ticket[]> {
    const query = this.ticketRepository.createQueryBuilder('ticket');
    
    // Gérer la correspondance des statuts entre frontend et backend
    if (filters.status) {
      if (filters.status === 'pending') {
        // 'pending' du frontend correspond à 'in_progress' dans le backend
        query.andWhere('ticket.status = :status', { status: 'in_progress' });
      } else if (filters.status === 'closed') {
        // 'closed' dans le frontend correspond à 'closed' ou 'resolved' dans le backend
        query.andWhere('(ticket.status = :closed OR ticket.status = :resolved)', { 
          closed: 'closed',
          resolved: 'resolved'
        });
      } else {
        // Pour 'open', on utilise directement la valeur
        query.andWhere('ticket.status = :status', { status: filters.status });
      }
    }
    
    // Autres filtres
    if (filters.priority) query.andWhere('ticket.priority = :priority', { priority: filters.priority });
    if (filters.assignee) query.andWhere('ticket.assignee = :assignee', { assignee: filters.assignee });
    if (filters.category) query.andWhere('ticket.category = :category', { category: filters.category });
    if (filters.tags) {
      // Recherche partielle sur tags (simple-array)
      query.andWhere('ticket.tags LIKE :tags', { tags: `%${filters.tags}%` });
    }
    
    // Trier par date de création par défaut
    query.orderBy('ticket.createdAt', 'DESC');
    
    return query.getMany();
  }

  async findOne(id: number | string): Promise<Ticket> {
    const ticketId = Number(id);
    if (isNaN(ticketId)) throw new NotFoundException('ID de ticket invalide');
    
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['comments'],
      order: {
        comments: {
          createdAt: 'ASC'
        }
      }
    });
    
    if (!ticket) {
      throw new NotFoundException(`Ticket avec l'ID ${id} non trouvé`);
    }
    
    return ticket;
  }

  async create(data: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.ticketRepository.create(data);
    return this.ticketRepository.save(ticket);
  }

  async update(id: number, data: Partial<Ticket>): Promise<Ticket> {
    await this.ticketRepository.update(id, data);
    const updated = await this.ticketRepository.findOneBy({ id });
    if (!updated) throw new NotFoundException('Ticket not found');
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
