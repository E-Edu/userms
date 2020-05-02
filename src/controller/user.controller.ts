import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../decorator/roles.decorator';
import { User } from '../entity/user.entity';
import { ScopeEnum } from '../model/scope.enum';
import { StatusCodesEnum } from '../model/status-codes.enum';
import { StatusModel } from '../model/status.model';
import { UserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    addUser(@Body() user: UserDto): Promise<StatusModel> {
        console.log('Incoming RequestBody', user);
        return this.userService.create(user).then(
            (value): StatusModel => {
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
    async getUser(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get(':id')
    @Roles(ScopeEnum.ADMIN, ScopeEnum.USER)
    async getUserByID(@Param() params): Promise<User> {
        return await this.userService.findOne(params.id);
    }
}
