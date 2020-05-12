import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./interceptor/logging.interceptor";
import { ServiceTokenAddInterceptor } from "./interceptor/service-token-add.interceptor";
import { ServiceTokenInterceptor } from "./interceptor/service-token.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: console });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalInterceptors(new ServiceTokenInterceptor());
    app.useGlobalInterceptors(new ServiceTokenAddInterceptor());

    const options = new DocumentBuilder()
        .setTitle('gawia UserMicroservice')
        .setDescription('gawia UserMicroservice Documentation')
        .setVersion('1.0')
        .addTag('gawia')
        .addServer('http://localhost:3000')
        .addServer('https://userms.gawia.com/')
        .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer',
        })
        .build();
    const document = SwaggerModule.createDocument(app, options);
    try {
        fs.writeFileSync('swagger-spec.json', JSON.stringify(document));
    } catch (e) {
        console.log(e);
    }

    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();
