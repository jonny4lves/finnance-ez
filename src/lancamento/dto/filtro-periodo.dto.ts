import { IsDateString, IsOptional } from 'class-validator';

export class FiltroPeriodoDto {
  @IsDateString()
  @IsOptional()
  dataInicial: string;

  @IsDateString()
  @IsOptional()
  dataFinal: string;
}