import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LancamentoService } from './lancamento.service';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { User } from '../decorators/public';
import { FiltroPeriodoDto } from './dto/filtro-periodo.dto';

@Controller('lancamento')
export class LancamentoController {
  constructor(private readonly lancamentoService: LancamentoService) {}

  @Post()
  create(@Body() createLancamentoDto: CreateLancamentoDto, @User() user: any) {
    return this.lancamentoService.create(createLancamentoDto, user.sub);
  }

  @Get()
  findAll() {
    return this.lancamentoService.findAll();
  }

  @Get('periodo')
  buscarPorPeriodo(@Query() filtro: FiltroPeriodoDto, @User() user: any) {
    return this.lancamentoService.buscarPorPeriodo(filtro, user.sub); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lancamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLancamentoDto: UpdateLancamentoDto) {
    return this.lancamentoService.update(+id, updateLancamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lancamentoService.remove(+id);
  }

}
