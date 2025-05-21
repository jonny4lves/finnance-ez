import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { User } from '../decorators/public';
import { TipoCategoria } from './entities/categoria.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto, @User() user: any) {
    return this.categoriaService.create(createCategoriaDto, user.sub);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get('/tipo/:tipo')
  findByTipo(@Param('tipo') tipo: TipoCategoria) {
    return this.categoriaService.findByTipo(tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
