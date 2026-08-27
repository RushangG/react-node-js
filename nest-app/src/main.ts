import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow requests from these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }); // Enable CORS for all origins

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
