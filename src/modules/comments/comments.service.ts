import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Ticket } from '../tickets/ticket.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findByTicket(ticketId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { ticket: { id: ticketId } }, order: { createdAt: 'ASC' } });
  }

  async create(ticketId: number, content: string, authorName: string): Promise<Comment> {
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    if (!ticket) throw new NotFoundException('Ticket not found');
    const comment = this.commentRepository.create({ content, authorName, ticket });
    return this.commentRepository.save(comment);
  }

  async remove(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) throw new NotFoundException('Comment not found');
    await this.commentRepository.remove(comment);
  }
}
