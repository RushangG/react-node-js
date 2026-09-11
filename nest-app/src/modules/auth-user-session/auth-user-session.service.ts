import { Injectable } from '@nestjs/common';
import { CreateAuthUserSessionDto } from './dto/create-auth-user-session.dto';
import { UpdateAuthUserSessionDto } from './dto/update-auth-user-session.dto';
import { AppDataSource } from 'src/data-source';
import { AuthUserSession } from './entities/auth-user-session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthUserSessionService {
  constructor(
    @InjectRepository(AuthUserSession)
    private readonly authUserRepo: Repository<AuthUserSession>,
  ) {}

  create(createAuthUserSessionDto: CreateAuthUserSessionDto) {
    let newAuthSession = this.authUserRepo.create(createAuthUserSessionDto);
    return this.authUserRepo.save(newAuthSession);
  }

  findAll() {
    let authSessions = this.authUserRepo.find();
    return authSessions;
  }

  findOne(id: number) {
    let authSession = this.authUserRepo.findOne({
      where: { id: id },
    });
    return authSession;
  }

  update(id: number, updateAuthUserSessionDto: UpdateAuthUserSessionDto) {
    let authSessionUpdate = this.authUserRepo.update(
      id,
      updateAuthUserSessionDto,
    );

    return authSessionUpdate;
  }

  remove(id: number) {
    let authSessionDelete = this.authUserRepo.delete(id);
    return 'delete successfully';
  }

  async verifyAccessToken(userId: number, accessToken: string) {
    let authSession = await this.authUserRepo.findOne({
      relations: {
        userId: true,
      },
      where: {
        userId: { id: userId },
      },
    });

    let accessTokenDb = authSession?.accessToken;
    if (!accessTokenDb) {
      return false;
    }

    let verify = bcrypt.compareSync(accessToken, accessTokenDb);

    return verify;
  }
}
