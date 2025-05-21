import { Module } from '@nestjs/common';
import { ContaBancariaService } from './conta-bancaria.service';
import { ContaBancariaController } from './conta-bancaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaBancaria } from './entities/conta-bancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContaBancaria])],
  controllers: [ContaBancariaController],
  providers: [ContaBancariaService],
})
export class ContaBancariaModule {}
