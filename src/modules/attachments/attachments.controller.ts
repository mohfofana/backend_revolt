import { Controller, Get, Post, Delete, Param, UploadedFile, UseInterceptors, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './attachment.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('tickets/:ticketId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get()
  findByTicket(@Param('ticketId') ticketId: string): Promise<Attachment[]> {
    return this.attachmentsService.findByTicket(Number(ticketId));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async uploadFile(
    @Param('ticketId') ticketId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Attachment> {
    return this.attachmentsService.create(Number(ticketId), {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    });
  }

  @Get('/:attachmentId/download')
  async download(
    @Param('attachmentId') attachmentId: string,
    @Res() res: Response,
  ) {
    const attachment = await this.attachmentsService.findOne(Number(attachmentId));
    return res.status(HttpStatus.OK).download(attachment.path, attachment.originalName);
  }

  @Delete('/:attachmentId')
  remove(
    @Param('attachmentId') attachmentId: string,
  ): Promise<void> {
    return this.attachmentsService.remove(Number(attachmentId));
  }
}
