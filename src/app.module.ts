import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import { userProvider } from './provider/user.provider';
import { UserService } from './service/user.service';
import { JwtConfigService } from './util/JwtConfigService';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev', '.env'],
            isGlobal: true,
        }),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        DatabaseModule,
        AppModule,
    ],
    controllers: [
        AppController,
        UserController,
        AuthController,
    ],
    providers: [
        ...userProvider,
        UserService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AppModule {
}
