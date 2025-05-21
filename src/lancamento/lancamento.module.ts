import { Module } from '@nestjs/common';
import { LancamentoService } from './lancamento.service';
import { LancamentoController } from './lancamento.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lancamento } from './entities/lancamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lancamento])],
  controllers: [LancamentoController],
  providers: [LancamentoService],
})
export class LancamentoModule {}
