import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria, TipoCategoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ) {}

  create(createCategoriaDto: CreateCategoriaDto, userId: number) {
    const { nome, tipo, status } = createCategoriaDto;

    const categoria = this.categoriaRepository.create({ nome, tipo,status, usuario: { id: userId } });

    return this.categoriaRepository.save(categoria);
  }

  findAll() {
    return this.categoriaRepository.find();
  }

  findOne(id: number) {
    return this.categoriaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
        throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }

    const updatedCategoria = this.categoriaRepository.merge(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(updatedCategoria);
  }

  async findByTipo(tipo: TipoCategoria) {
    const categorias = await this.categoriaRepository.find({ where: { tipo } });
    return categorias;
  }

  remove(id: number) {
    return this.categoriaRepository.delete(id);
  }
}
