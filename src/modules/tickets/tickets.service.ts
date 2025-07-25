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

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) throw new NotFoundException('Ticket not found');
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
