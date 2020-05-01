import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserDto } from '../model/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() body: UserDto) {
        return this.authService.login(body);
    }
}
