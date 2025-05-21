import { IsEnum, IsString } from "class-validator";
import { StatusEnum } from "../../constants/status.enum";
import { TipoCategoria } from "../entities/categoria.entity";

export class CreateCategoriaDto {
    @IsString()
    nome: string;
    @IsEnum(TipoCategoria)
    tipo: TipoCategoria;
    @IsEnum(StatusEnum)
    status: StatusEnum;
}
