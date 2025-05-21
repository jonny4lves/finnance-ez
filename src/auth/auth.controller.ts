import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationDTO } from './AuthenticationDTO';
import { Public } from '../decorators/public';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Public()
    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: AuthenticationDTO) {
        return this.authService.signIn(dto.username, dto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
