import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../entity/user.enetity';
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

    @UseGuards(JwtAuthGuard)
    @Post()
    addUser(@Body() user: UserDto) {
        return this.userService.create(user);
    }

}
