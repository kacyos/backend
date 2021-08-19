import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateProposalDto } from './dto/create-proposal.dto';

@Controller('propostas')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProposalDto: CreateProposalDto, @Req() req: Request) {
    return this.proposalService.create(createProposalDto, req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.proposalService.findAll(req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  hire(@Param('id') id: string, @Req() req: Request) {
    return this.proposalService.hire(id, req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proposalService.remove(id);
  }
}
