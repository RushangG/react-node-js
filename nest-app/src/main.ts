import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/http.exception.filter';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const app = await NestFactory.create(AppModule, {
  //   logger: new ConsoleLogger({
  //     json: true, // Enable JSON logging
  //     timestamp: true, // Include timestamps in logs
  //     colors: true, // Enable colored output in the console
  //   }),
  // });

  // global exception filter.
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  // safe backend details with helmet
  app.use(helmet());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // remove properties that not in dto.
  //     transform: true, // transform payloads to dto objects.
  //   }),
  // );
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4321',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }); // Enable CORS for specified origins

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API documentation for the NestJS application')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
