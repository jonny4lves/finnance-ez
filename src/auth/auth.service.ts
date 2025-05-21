import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, senha: string) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new UnauthorizedException('Email ou senha inválidos');

        if (!await this.userService.comparePassword(senha, user.senha))
            throw new UnauthorizedException('Email ou senha inválidos');
            
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
