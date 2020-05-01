import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    id?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
