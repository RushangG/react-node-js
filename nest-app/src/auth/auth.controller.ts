import { Body, Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { Users } from '../users/entities/users.entity';
import { Public } from './public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(body.email, body.password);

    //cookie set for authToken
    // response.cookie('authToken', token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   maxAge: 3600000, // 1 hour in milliseconds
    // });

    return { message: 'Login successful', token };
  }

  @Post('register')
  @Public()
  async register(@Body() body: Users) {
    return await this.authService.register(body);
  }
}
