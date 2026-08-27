import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // use for reading metadata(public decorator).
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log('context.getHandler():', context.getHandler());
    // console.log('context.getClass():', context.getClass());

    // console.log (
    //   'this.reflector.getAllAndOverride.toString():',
    //   this.reflector.getAllAndOverride.toString(),
    // );

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log('isPublic1:', isPublic);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    //cookie based authentication
    // console.log('authHeader:', authHeader);
    // const cookieToken = req.cookies['authToken'];

    // const token = cookieToken.token;
    // console.log('token:', token);
    try {
      // verify token
      const decodedPayload = new JwtService().verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req.user = decodedPayload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
