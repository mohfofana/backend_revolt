import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('tickets/:ticketId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findByTicket(@Param('ticketId') ticketId: string): Promise<Comment[]> {
    return this.commentsService.findByTicket(Number(ticketId));
  }

  @Post()
  create(
    @Param('ticketId') ticketId: string,
    @Body('content') content: string,
    @Body('authorName') authorName: string,
  ): Promise<Comment> {
    return this.commentsService.create(Number(ticketId), content, authorName);
  }

  @Delete(':commentId')
  remove(
    @Param('ticketId') ticketId: string,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    return this.commentsService.remove(Number(commentId));
  }
}
