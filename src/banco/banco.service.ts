import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { Banco } from './entities/banco.entity';

@Injectable()
export class BancoService {
  constructor(
    @InjectRepository(Banco)
    private readonly bancoRepository: Repository<Banco>,
  ) {}

  async create(createBancoDto: CreateBancoDto) {
    const { nome, status } = createBancoDto;
    
    const banco = this.bancoRepository.create({ nome, status });

    return await this.bancoRepository.save(banco);
  }

  findAll() {
    return this.bancoRepository.find();
  }

  findOne(id: number) {
    return this.bancoRepository.findOne({ where: { id } });
  }

  // update(id: number, updateBancoDto: UpdateBancoDto) {
  //   return `This action updates a #${id} banco`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} banco`;
  // }
}
