import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      
      exceptionFactory: (errors) => {
      const formattedErrors: Record<string, string> = {};

      for (const error of errors) {
        formattedErrors[error.property] =
          Object.values(error.constraints ?? {})[0];
      }

      return new BadRequestException({
        errors: formattedErrors,
      });
    },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
