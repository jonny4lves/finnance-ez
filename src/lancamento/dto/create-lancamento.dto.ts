import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { StatusLancamento, TipoLancamento } from "../entities/lancamento.entity";

export class CreateLancamentoDto {
    @IsString()
    descricao: string;
  
    @IsNumber()
    valor: number;
  
    @IsDateString()
    dataVencimento: string;
  
    @IsOptional()
    @IsDateString()
    dataPagamento?: string;
  
    @IsEnum(TipoLancamento)
    tipo: TipoLancamento;
  
    @IsEnum(StatusLancamento)
    status: StatusLancamento;

    @IsNumber()
    contaBancariaId: number;
  
    @IsNumber()
    categoriaId: number;
}
