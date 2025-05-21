import { Injectable } from '@nestjs/common';
import { CreateLancamentoDto } from './dto/create-lancamento.dto';
import { UpdateLancamentoDto } from './dto/update-lancamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lancamento, TipoLancamento } from './entities/lancamento.entity';
import { Between, Repository } from 'typeorm';
import { FiltroPeriodoDto } from './dto/filtro-periodo.dto';

@Injectable()
export class LancamentoService {

  constructor(
    @InjectRepository(Lancamento)
    private readonly lancamentoRepository: Repository<Lancamento>
  ) {}

  async create(createLancamentoDto: CreateLancamentoDto, userId: number) {
    const {descricao, valor, dataVencimento, dataPagamento, tipo, status, categoriaId, contaBancariaId } = createLancamentoDto;

    const lancamento = this.lancamentoRepository.create({
      descricao, valor, dataLancamento: new Date(), dataVencimento, dataPagamento, tipo, status,
      categoria: { id: categoriaId }, contaBancaria: { id: contaBancariaId},usuario: { id: userId }
    });

    return await this.lancamentoRepository.save(lancamento);
  }

  findAll() {
    return this.lancamentoRepository.find({relations: ['categoria', 'contaBancaria']});
  }

  findOne(id: number) {
    return `This action returns a #${id} lancamento`;
  }

  update(id: number, updateLancamentoDto: UpdateLancamentoDto) {
    return `This action updates a #${id} lancamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} lancamento`;
  }

  async buscarPorPeriodo(filtro: FiltroPeriodoDto, userId: number) {
    const { dataInicial, dataFinal } = filtro;
  
    const lancamentos = await this.lancamentoRepository.find({
      where: {
        usuario: { id: userId },
        dataLancamento: Between(new Date(dataInicial), new Date(dataFinal)),
      },
      relations: ['categoria'],
      order: { dataLancamento: 'ASC' },
    });
  
    const saldo = lancamentos.reduce((total, lancamento) => {
      if (TipoLancamento.RECEITA === lancamento.tipo) {
        return total + Number(lancamento.valor);
      } else {
        return total - Number(lancamento.valor);
      }
    }, 0);
  
    return {saldo, lancamentos};
  }
  
}
