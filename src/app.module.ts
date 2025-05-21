import { Lancamento } from './lancamento/entities/lancamento.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BancoModule } from './banco/banco.module';
import { ContaBancariaModule } from './conta-bancaria/conta-bancaria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './user/Usuario';
import { Banco } from './banco/entities/banco.entity';
import { ContaBancaria } from './conta-bancaria/entities/conta-bancaria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { LancamentoModule } from './lancamento/lancamento.module';

@Module({
  imports: [UserModule, AuthModule, BancoModule, ContaBancariaModule, CategoriaModule, LancamentoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2013.jota',
      database: 'finnance-ez',
      entities: [Usuario, Banco, ContaBancaria, Categoria, Lancamento],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Usuario, Banco, ContaBancaria, Categoria, Lancamento]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
