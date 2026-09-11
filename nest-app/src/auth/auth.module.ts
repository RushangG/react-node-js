import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../modules/users/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserSession } from '../modules/auth-user-session/entities/auth-user-session.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AuthUserSession]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
