import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { StatusEnum } from "../../constants/status.enum";

export class CreateBancoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;
    @IsEnum(StatusEnum)
    status: StatusEnum;
}
