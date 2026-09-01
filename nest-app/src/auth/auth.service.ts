import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from '../modules/users/entities/users.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,

    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    const existingUser = await this.userRepo.findOneBy({ email: user.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepo.create({
      ...user,
      password: hashedPassword,
    });
    return await this.userRepo.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    //compare the password.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  // logout
  async logout(userId: number) {
    await this.userRepo.update({ id: userId }, { hashedRefreshToken: null });
  }

  async getTokens(userId: number, email: string, role: string) {
    const jwtPayload = { id: userId, email: email, role: role };
    console.log('jwtsecret', process.env.JWT_SECRET);
    console.log('jwtrefreshsecret', process.env.JWT_REFRESH_SECRET);

    const accessToken = await this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15s',
    });

    const refreshToken = await this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied Refresh Token not found');
    }

    const isTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isTokenValid) {
      throw new ForbiddenException('Access Denied Invalid Refresh Token');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
