import { Injectable } from '@nestjs/common';
import { CreateContaBancariaDto } from './dto/create-conta-bancaria.dto';
import { UpdateContaBancariaDto } from './dto/update-conta-bancaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaBancaria } from './entities/conta-bancaria.entity';
import { StatusEnum } from '../constants/status.enum';

@Injectable()
export class ContaBancariaService {

  constructor(
    @InjectRepository(ContaBancaria)
    private readonly contaBancariaRepository: Repository<ContaBancaria>
  ){}

  async create(createContaBancariaDto: CreateContaBancariaDto, userId: number) {
    const { nome, saldo, bancoId } = createContaBancariaDto;

    const contaBancaria = this.contaBancariaRepository.create({ nome, saldo, status: StatusEnum.ATIVA, banco: {id: bancoId}, usuario: { id: userId } });

    return await this.contaBancariaRepository.save(contaBancaria);
  }

  async findAll() {
    return await this.contaBancariaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} contaBancaria`;
  }

  update(id: number, updateContaBancariaDto: UpdateContaBancariaDto) {
    return `This action updates a #${id} contaBancaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} contaBancaria`;
  }
}
