import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BearerTokenDto } from '../model/bearer-token.dto';
import { UserCreateDto } from '../model/user-create.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiHeader({
    name: 'X-ServiceToken',
    description: 'ServiceToken',
})
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: [UserCreateDto] })
    @ApiBadRequestResponse()
    @ApiResponse({ status: 200, type: BearerTokenDto })
    async login(@Body() body: UserCreateDto): Promise<BearerTokenDto> {
        return this.authService.login(body);
    }
}
