import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    passwordHash: string;
}
