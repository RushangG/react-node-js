import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(Context: ExecutionContext): Promise<boolean> {
    const request = Context.switchToHttp().getRequest();

    const refreshToken = request.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      request.user = decoded; // assign the current user.

      console.log('Decoded refresh token:', decoded); // Log the decoded token to see its contents
      return true;
    } catch (error) {
      console.error('Error verifying refresh token:', error); // Log the error for debugging
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
