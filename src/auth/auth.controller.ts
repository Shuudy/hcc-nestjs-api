import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Sign in member' })
    @ApiResponse({ status: 200, description: 'Member successfully signed in.', schema: {
        type: 'object',
        properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Connexion réussie' },
            access_token: { type: 'string', example: 'your-jwt-token' },
        },
    }})
    @ApiResponse({ status: 400, description: 'Invalid credentials provided.' })
    @ApiResponse({ status: 401, description: 'Unauthorized: Incorrect credentials.' })
    async signIn(@Body() authDto: AuthDto) {
        const token = await this.authService.signIn(authDto.email, authDto.password);
        return {
            status: 'success',
            message: 'Connexion réussie',
            access_token: token
        };
    }
}
