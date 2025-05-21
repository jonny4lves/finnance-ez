import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banco {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    status: number;

}
