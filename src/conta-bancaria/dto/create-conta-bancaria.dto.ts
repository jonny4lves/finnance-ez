import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusEnum } from "../../constants/status.enum";

export class CreateContaBancariaDto {
    @IsString()
    @IsNotEmpty()
    nome: string;
    @IsNumber()
    saldo: number;
    @IsNumber()
    bancoId: number;
}
