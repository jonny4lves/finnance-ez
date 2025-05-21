import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    nome: string;
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    senha: string;
}