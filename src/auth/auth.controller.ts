import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(@Body() body: any) {
        const token = await this.authService.signIn(body.email, body.password);
        return { access_token: token };
    }
}
