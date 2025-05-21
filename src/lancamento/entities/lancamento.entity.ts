import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContaBancaria } from "../../conta-bancaria/entities/conta-bancaria.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../user/Usuario";
  
export enum TipoLancamento {
    RECEITA = 'R',
    DESPESA = 'D',
}
  
export enum StatusLancamento {
    PENDENTE = 'PE',
    PAGO = 'PG',
    CANCELADO = 'CA',
}
  
@Entity()
export class Lancamento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    descricao: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;
  
    @Column({ type: 'enum', enum: TipoLancamento })
    tipo: TipoLancamento;
  
    @Column({type: 'enum', enum: StatusLancamento})
    status: StatusLancamento;
  
    @Column({ name: 'data_lancamento' , type: 'date' })
    dataLancamento: Date;
  
    @Column({ name: 'data_vencimento' , type: 'date', nullable: true })
    dataVencimento: Date;
  
    @Column({ name: 'data_pagamento', type: 'date', nullable: true })
    dataPagamento: Date;
  
    @ManyToOne(() => ContaBancaria)
    @JoinColumn({ name: 'conta_bancaria_id' })
    contaBancaria: ContaBancaria;
  
    @ManyToOne(() => Categoria)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
}

