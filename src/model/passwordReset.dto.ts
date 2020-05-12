import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
    @IsNotEmpty()
    @ApiProperty()
    passwordHash: string;
}
