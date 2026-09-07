import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/http.exception.filter';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { doubleCsrf } from 'csrf-csrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize the transactional context for TypeORM transactions
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  //  const { doubleCsrfProtection } = doubleCsrf({
  //     getSecret: () => 'your-very-secure-csrf-secret',

  //     getSessionIdentifier: (req) => {
  //       // Assuming you are using cookies to store the session ID
  //       return req.cookies.sessionId;
  //     },
  //     ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // Safe methods don't need validation
  //   });

  //   app.use(doubleCsrfProtection); // Apply CSRF protection middleware

  // safe backend details with helmet
  app.use(helmet());

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
