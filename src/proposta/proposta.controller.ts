import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //Delete,
  //UsePipes,
  //ValidationPipe,
} from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { CreatePropostaDto } from './dto/create-proposta.dto';
//import { UpdatePropostaDto } from './dto/update-proposta.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('propostas')
export class PropostaController {
  constructor(private readonly propostaService: PropostaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPropostaDto: CreatePropostaDto) {
    return this.propostaService.create(createPropostaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.propostaService.findAll();
  }

  @Patch(':id')
  contratarProposta(@Param('id') id: string) {
    return this.propostaService.contratarProposta(id);
  }

  @Delete(':id')
  excluirProposta(@Param('id') id: string) {
    return this.propostaService.excluirProposta(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePropostaDto: UpdatePropostaDto) {
  //   return this.propostaService.update(+id, updatePropostaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propostaService.remove(+id);
  // }
}
