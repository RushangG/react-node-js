import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const reqRole = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!reqRole) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const header = req.headers['authorization'];

    if (!header) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = header.split(' ')[1];

    try {
      const decodedPayload = new JwtService().verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const userRole = decodedPayload.role;

      if (!reqRole.includes(userRole)) {
        throw new UnauthorizedException('User does not have the required role');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid token or user does not have the required role',
      );
    }
  }
}
