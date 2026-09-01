import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/http.expection.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // Strip properties that do not have any decorators
  //     transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  //   }),
  // );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow requests from these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }); // Enable CORS for all origins

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
