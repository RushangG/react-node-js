import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { Users } from '../modules/users/entities/users.entity';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { Public } from './public.decorator';
import { RefreshTokenGuard } from './refresh.token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  @Public()
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(body.email, body.password);

    const token = await this.authService.getTokens(
      user.id,
      user.email,
      user.role,
    );

    // save the new  refresh token in the database
    await this.authService.updateRefreshToken(user.id, token.refreshToken);

    //cookie set for authToken
    response.cookie('refreshToken', token.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      secure: false, // allow http in development, set to true in production
      httpOnly: true, // prevent client-side JavaScript from accessing the cookie
      sameSite: 'strict',
    });

    return { message: 'Login successful', token: token.accessToken };
  }

  @Public()
  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  async getRefreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('Request user:', req.user); // Log the request object to see what is being received

    const userId = req.user.id;
    const refreshTokens = req.cookies['refreshToken'];

    if (!refreshTokens) {
      return { message: 'Refresh token not found' };
    }

    const Tokens = await this.authService.refreshTokens(userId, refreshTokens);
    return { accessToken: Tokens };
  }

  @Post('logout')
  async logout(
    @Body() body: { userId: number },
    @Res({ passthrough: true }) response: Response,
    @Req() req,
  ) {
    //   console.log('Logout request body:', body); // Log the request body to see what is being sent
    // // Log the request object to see what is being received
    console.log('req.user:', req.user);
    await this.authService.logout(req.user.id);

    response.clearCookie('refreshToken');

    return { message: 'Logout successful' };
  }
}
