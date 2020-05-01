import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
