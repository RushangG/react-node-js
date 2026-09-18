import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
type payloadType = {
  userId: number;
  username: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getAccessToken(payload: payloadType) {
    let accesToken = await this.jwtService.sign(payload, {
      secret: process.env.accessSecret,
      expiresIn: '15m',
    });

    return accesToken;
  }

  async getRefreshToken(payload: payloadType) {
    let refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.refreshSecret,
      expiresIn: '7d',
    });

    return refreshToken;
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      let verify = await this.jwtService.verify(refreshToken, {
        secret: process.env.refreshSecret,
      });

      let payload = {
        userId: verify.userId,
        username: verify.username,
        role: verify.role,
      };

      if (verify) {
        let accessToken = await this.getAccessToken(payload);
        return { accessToken };
      }
    } catch (err) {
      throw new UnauthorizedException(`Invalid RefreshToken`);
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    const username = createAuthDto.username;
    const password = createAuthDto.password;
    const user = await this.usersService.findOneByUsername(username);

    let verify = await bcrypt.compare(password, user.passwordHash);

    if (!verify) {
      throw new UnauthorizedException();
    }
    let payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    let accessToken = await this.getAccessToken(payload);

    let refreshToken = await this.getRefreshToken(payload);

    let response = {
      accessToken,
      refreshToken,
      payload,
    };

    return response;
  }

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
