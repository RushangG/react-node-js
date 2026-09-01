import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log('ValidationPipe value:', value);
    return value;
  }
}
