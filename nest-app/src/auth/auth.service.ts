import {
  ForbiddenException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from '../modules/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { AuthUserSession } from '../modules/auth-user-session/entities/auth-user-session.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(AuthUserSession)
    private authUserSessionRepo: Repository<AuthUserSession>,
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
    await this.authUserSessionRepo.delete({ userId: { id: userId } });
    await this.userRepo.update({ id: userId }, { hashedRefreshToken: null });
  }

  async getAccessToken(userId: number, email: string, role: string) {
    let user = await this.userRepo.find({
      where: { id: userId },
    });

    let userName = user[0].name;
    const jwtPayload = { id: userId, email: email, role: role, name: userName };
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
    // console.log('jwtsecret', process.env.JWT_SECRET);
    // console.log('jwtrefreshsecret', process.env.JWT_REFRESH_SECRET);

    const accessToken = await this.getAccessToken(userId, email, role);

    const refreshToken = await this.getRefreshToken(userId, email, role);

    let hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    let hashedAccessToken = await bcrypt.hash(accessToken, 10);

    let authSession = {
      userId: { id: userId },
      accessToken: hashedAccessToken,
      accessTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      refreshToken: hashedRefreshToken,
      refreshTokenExpiry: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    };

    let checkSession = await this.authUserSessionRepo.findOne({
      relations: {
        userId: true,
      },
      where: {
        userId: { id: userId },
      },
    });
    console.log('checkSession', checkSession);

    if (!checkSession) {
      let userAuthSession = await this.authUserSessionRepo.create(authSession);

      await this.authUserSessionRepo.save(userAuthSession);
    } else {
      let authId = checkSession.id;
      await this.authUserSessionRepo.update(authId, {
        ...authSession,
        userId: { id: userId },
      });
    }

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

    let hashedAccessToken = await bcrypt.hash(accessTokens, 10);

    let authUpdate = await this.authUserSessionRepo.update(
      { userId: { id: userId } },
      { accessToken: hashedAccessToken },
    );

    console.log('authUpdate', authUpdate);
    return accessTokens;
  }
}
