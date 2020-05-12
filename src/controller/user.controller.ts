import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RoleGuard } from "../auth/role.guard";
import { Roles } from "../decorator/roles.decorator";
import { PasswordResetDto } from "../model/passwordReset.dto";
import { ScopeEnum } from "../model/scope.enum";
import { StatusCodesEnum } from "../model/status-codes.enum";
import { StatusDto } from "../model/status.dto";
import { UserCreateDto } from "../model/user-create.dto";
import { UserResponeDto } from "../model/user-respone.dto";
import { UserService } from "../service/user.service";

@ApiHeader({
    name: 'X-ServiceToken',
    description: 'ServiceToken',
})
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiTags('auth')
    @Post()
    addUser(@Body() user: UserCreateDto): Promise<StatusDto> {
        console.log('Incoming RequestBody', user);
        return this.userService.create(user).then(
            (value): StatusDto => {
                if (value) {
                    return {
                        status: StatusCodesEnum.CREATED,
                        message: 'Successfully created',
                    };
                }
            },
        );
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    @Roles(ScopeEnum.ADMIN)
    @ApiBearerAuth()
    async getUser(): Promise<UserResponeDto[]> {
        return await this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get(':id')
    @Roles(ScopeEnum.ADMIN, ScopeEnum.USER)
    @ApiBearerAuth()
    async getUserByID(@Param() params): Promise<UserResponeDto> {
        return await this.userService.findOne(params.id);
    }

    @Get('resetPassword/:email')
    sendResetEmail(@Param() params) {
        this.userService.resetPassword(params.email);
    }

    @Post('resetPassword/token/:token')
    getNewPassword(@Param() params, @Body() password: PasswordResetDto) {
        this.userService.updatePassword(password, params.token);
    }
}
