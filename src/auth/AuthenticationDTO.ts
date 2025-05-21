import { IsEmail, IsString } from "class-validator";

export class AuthenticationDTO {
    @IsEmail()
    username: string;
    @IsString()
    password: string;
}