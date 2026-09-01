import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { Users } from '../modules/users/entities/users.entity';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
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
    const user = await this.authService.login(body.email, body.password);

    const token = await this.authService.getTokens(
      user.id,
      user.email,
      user.role,
    );

    const refreshToken = await this.authService.updateRefreshToken(
      user.id,
      token.refreshToken,
    );

    //cookie set for authToken
    response.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    return { message: 'Login successful', token: token.accessToken };
  }

  @Post('register')
  @Public()
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Post('refresh-token')
  @Public()
  async getrefreshToken(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('Request user:', req.user); // Log the request object to see what is being received
    const userId = req.user.id; 
    const referecnceToken = req.cookies['refreshToken'];

    if (!referecnceToken) {
      return { message: 'Refresh token not found' };
    }

    const token = await this.authService.refreshTokens(userId, referecnceToken);

    response.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    return { accessToken: token.accessToken };
  }

  @Post('logout')
  async logout(
    @Body() body: { userId: number },
    @Res({ passthrough: true }) response: Response,
    @Req() req,
  ) {
    //   console.log('Logout request body:', body); // Log the request body to see what is being sent
    // // Log the request object to see what is being received

    await this.authService.logout(req.user.id);

    response.clearCookie('refreshToken');

    return { message: 'Logout successful' };
  }
}
