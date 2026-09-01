import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before handling the request...');
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        console.log(`After handling the request... ${Date.now() - now}ms`),
      ),
      // map((resData) => {
      //   return {
      //     success: true,
      //     statusCode: response.statusCode,
      //     data: resData,
      //   };
      // }),
    );
  }
}
