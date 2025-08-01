import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery, 
  ApiBearerAuth,
  ApiBody 
} from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { Ticket, TicketStatus } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les tickets avec filtrage optionnel' })
  @ApiResponse({ status: 200, description: 'Liste des tickets retournée avec succès', type: [Ticket] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiQuery({ name: 'status', required: false, enum: ['open', 'pending', 'closed'], description: 'Filtrer par statut du ticket' })
  @ApiQuery({ name: 'priority', required: false, enum: ['low', 'medium', 'high', 'critical'], description: 'Filtrer par priorité' })
  @ApiQuery({ name: 'assignee', required: false, description: 'Filtrer par ID du responsable' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrer par catégorie' })
  @ApiQuery({ name: 'tags', required: false, description: 'Filtrer par tags (séparés par des virgules)' })
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
  @ApiOperation({ summary: 'Récupérer un ticket par son ID' })
  @ApiParam({ name: 'id', description: 'ID du ticket', type: Number })
  @ApiResponse({ status: 200, description: 'Ticket trouvé', type: Ticket })
  @ApiResponse({ status: 404, description: 'Ticket non trouvé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau ticket' })
  @ApiBody({ type: CreateTicketDto, description: 'Données du ticket à créer' })
  @ApiResponse({ status: 201, description: 'Ticket créé avec succès', type: Ticket })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour complètement un ticket' })
  @ApiParam({ name: 'id', description: 'ID du ticket à mettre à jour', type: Number })
  @ApiBody({ type: UpdateTicketDto, description: 'Nouvelles données du ticket' })
  @ApiResponse({ status: 200, description: 'Ticket mis à jour avec succès', type: Ticket })
  @ApiResponse({ status: 404, description: 'Ticket non trouvé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'un ticket' })
  @ApiParam({ name: 'id', description: 'ID du ticket', type: Number })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        status: { 
          type: 'string', 
          enum: ['open', 'pending', 'closed'],
          example: 'pending'
        } 
      } 
    } 
  })
  @ApiResponse({ status: 200, description: 'Statut mis à jour avec succès', type: Ticket })
  @ApiResponse({ status: 404, description: 'Ticket non trouvé' })
  @ApiResponse({ status: 400, description: 'Statut invalide' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TicketStatus,
  ): Promise<Ticket> {
    const ticket = await this.ticketsService.findOne(+id);
    ticket.status = status;
    return this.ticketsService.update(+id, ticket);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un ticket' })
  @ApiParam({ name: 'id', description: 'ID du ticket à supprimer', type: Number })
  @ApiResponse({ status: 200, description: 'Ticket supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Ticket non trouvé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Droits insuffisants' })
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketsService.remove(+id);
  }
}
