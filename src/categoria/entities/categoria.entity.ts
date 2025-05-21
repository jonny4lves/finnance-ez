import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../user/Usuario";
import { StatusEnum } from "../../constants/status.enum";


export enum TipoCategoria {
    CREDITO = 'C',
    DEBITO = 'D',
}

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string;
  
    @Column({ type: 'enum', enum: TipoCategoria })
    tipo: TipoCategoria;
    
    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ATIVA })
    status: StatusEnum;;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario; 
}
