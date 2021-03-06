import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    id?: string;

    @ApiProperty()
    @IsNotEmpty()
    passwordHash: string;
}
