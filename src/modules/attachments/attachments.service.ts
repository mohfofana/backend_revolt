import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import { Ticket } from '../tickets/ticket.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findByTicket(ticketId: number): Promise<Attachment[]> {
    return this.attachmentRepository.find({ where: { ticket: { id: ticketId } }, order: { uploadedAt: 'ASC' } });
  }

  async findOne(id: number): Promise<Attachment> {
    const attachment = await this.attachmentRepository.findOneBy({ id });
    if (!attachment) throw new NotFoundException('Attachment not found');
    return attachment;
  }

  async create(ticketId: number, fileData: Partial<Attachment>): Promise<Attachment> {
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    if (!ticket) throw new NotFoundException('Ticket not found');
    const attachment = this.attachmentRepository.create({ ...fileData, ticket });
    return this.attachmentRepository.save(attachment);
  }

  async remove(id: number): Promise<void> {
    const attachment = await this.attachmentRepository.findOneBy({ id });
    if (!attachment) throw new NotFoundException('Attachment not found');
    await this.attachmentRepository.remove(attachment);
  }
}
