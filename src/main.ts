import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ServiceTokenAddInterceptor } from './interceptor/service-token-add.interceptor';
import { ServiceTokenInterceptor } from './interceptor/service-token.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: console });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalInterceptors(new ServiceTokenInterceptor());
    app.useGlobalInterceptors(new ServiceTokenAddInterceptor());
    await app.listen(3333);
}

bootstrap();
