import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropostaService } from './proposta.service';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';

@Controller('proposta')
export class PropostaController {
  constructor(private readonly propostaService: PropostaService) {}

  @Post()
  //convert JSON to typed object according to DTO class
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createPropostaDto: CreatePropostaDto) {
    return this.propostaService.create(createPropostaDto);
  }

  // @Get()
  // findAll() {
  //   return this.propostaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propostaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePropostaDto: UpdatePropostaDto) {
  //   return this.propostaService.update(+id, updatePropostaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propostaService.remove(+id);
  // }
}