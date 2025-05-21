import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../user/Usuario";
import { Banco } from "../../banco/entities/banco.entity";
import { StatusEnum } from "../../constants/status.enum";

@Entity('conta_bancaria')
export class ContaBancaria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column('decimal', { precision: 10, scale: 2 })
    saldo: number;

    @Column({type: 'enum', enum: StatusEnum, default: StatusEnum.ATIVA})
    status: StatusEnum;
    
    @ManyToOne(() => Banco)
    @JoinColumn({ name: 'banco_id' })
    banco: Banco;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

}
