import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshtokenDto {
    @IsNotEmpty()
    @ApiProperty()
    // tslint:disable-next-line:variable-name
    refresh_token: string;

    @IsNotEmpty()
    @ApiProperty()
    userId: string;
}
