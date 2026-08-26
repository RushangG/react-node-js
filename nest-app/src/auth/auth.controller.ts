import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '../users/entities/users.entity';
import { Public } from './public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body.email, body.password);
  }

  @Post('register')
  @Public()
  async register(@Body() body: Users) {
    return await this.authService.register(body);
  }
}
