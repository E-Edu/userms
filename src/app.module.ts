import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import { userProvider } from './provider/user.provider';
import { UserService } from './service/user.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev', '.env'],
        }),
        DatabaseModule,
        AppModule,
    ],
    controllers: [AppController, UserController],
    providers: [
        AppService,
        ...userProvider,
        UserService,
    ],
})
export class AppModule {
}
