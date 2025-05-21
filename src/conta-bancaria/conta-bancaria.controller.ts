import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ContaBancariaService } from './conta-bancaria.service';
import { CreateContaBancariaDto } from './dto/create-conta-bancaria.dto';
import { UpdateContaBancariaDto } from './dto/update-conta-bancaria.dto';
import { User } from '../decorators/public';

@Controller('conta-bancaria')
export class ContaBancariaController {
  constructor(private readonly contaBancariaService: ContaBancariaService) {}

  @Post()
  create(@Body() createContaBancariaDto: CreateContaBancariaDto, @User() user: any) {
    return this.contaBancariaService.create(createContaBancariaDto, user.sub);
  }

  @Get()
  findAll() {
    return this.contaBancariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contaBancariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaBancariaDto: UpdateContaBancariaDto) {
    return this.contaBancariaService.update(+id, updateContaBancariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contaBancariaService.remove(+id);
  }
}
