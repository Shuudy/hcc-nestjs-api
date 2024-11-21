import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() authDto: AuthDto) {
        const token = await this.authService.signIn(authDto.email, authDto.password);
        return {
            status: 'success',
            message: 'Connexion réussie',
            access_token: token
        };
    }
}
