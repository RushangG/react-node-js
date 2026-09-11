import { Module } from '@nestjs/common';
import { AuthUserSessionService } from './auth-user-session.service';
import { AuthUserSessionController } from './auth-user-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserSession } from './entities/auth-user-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserSession])],
  controllers: [AuthUserSessionController],
  providers: [AuthUserSessionService],
  exports: [AuthUserSessionService],
})
export class AuthUserSessionModule {}
