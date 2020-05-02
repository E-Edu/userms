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
import { scopeProvider } from './provider/scope.provider';
import { userProvider } from './provider/user.provider';
import { ScopeService } from './service/scope.service';
import { UserService } from './service/user.service';
import { JwtConfigService } from './util/JwtConfigService';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev', '.env'],
            isGlobal: true,
        }),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        PassportModule,
        /*MailerModule.forRootAsync({
            useFactory: () => ({
                transport: '', // TODO smtp sting anlegen
                defaults: {
                    from: '"e-edu" <no-reply@e-edu.com>',
                },
                preview: true,
                template: {
                    dir: __dirname + '/mail-template',
                    adapter: new PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),*/
        DatabaseModule,
        AppModule,
    ],
    controllers: [AppController, UserController, AuthController],
    providers: [
        /* {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },*/
        ...userProvider,
        ...scopeProvider,
        UserService,
        ScopeService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AppModule {
}
