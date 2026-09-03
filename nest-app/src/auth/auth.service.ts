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

  // register
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

  //login
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

  async getAccessToken(userId: number, email: string, role: string) {
    const jwtPayload = { id: userId, email: email, role: role };
    const accessToken = await this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
    return accessToken;
  }

  async getRefreshToken(userId: number, email: string, role: string) {
    const jwtPayload = {
      id: userId,
      email: email,
      role: role,
    };
    const refreshToken = await this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '5d', // 5 day
    });

    console.log('Generated refresh token:', refreshToken); // Log the generated refresh token
    return refreshToken;
  }

  async getTokens(userId: number, email: string, role: string) {
    console.log('jwtsecret', process.env.JWT_SECRET);
    console.log('jwtrefreshsecret', process.env.JWT_REFRESH_SECRET);

    const accessToken = await this.getAccessToken(userId, email, role);

    const refreshToken = await this.getRefreshToken(userId, email, role);

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

    console.log('isTokenValid:', isTokenValid); // Log the result of the token validation

    if (!isTokenValid) {
      throw new ForbiddenException('Access Denied Invalid Refresh Token');
    }

    const accessTokens = await this.getAccessToken(
      user.id,
      user.email,
      user.role,
    );

    return accessTokens;
  }
}
