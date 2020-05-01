import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../entity/user.enetity';
import { StatusCodesEnum } from '../model/status-codes.enum';
import { StatusModel } from '../model/status.model';
import { UserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserByID(@Param() params): Promise<User> {
        return await this.userService.findOne(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    addUser(@Body() user: UserDto): Promise<StatusModel> {
        console.log('Incoming RequestBody', user);
        return this.userService.create(user).then((value: boolean): StatusModel => {
            if (value) {
                return {
                    status: StatusCodesEnum.CREATED,
                    message: 'Successfully created',
                };
            }
        });
    }
}
