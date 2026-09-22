import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message = 
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'Internal server error';

    res.status(status).json({
      status: status,
      message: message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
