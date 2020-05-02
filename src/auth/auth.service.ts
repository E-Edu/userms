import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserDto } from 'src/model/user.dto';
import { UserService } from '../service/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async login(userDto: UserDto) {
        const user = await this.usersService.findOneByEmail(userDto.email);
        if (compareSync(userDto.password, user.password)) {
            return {
                access_token: this.jwtService.sign({
                    email: user.email,
                    sub: user.id,
                    scope: user.scope,
                }),
            };
        }
        throw new UnauthorizedException();
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
