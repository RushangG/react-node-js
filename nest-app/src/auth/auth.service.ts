import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,

    private jwtService: JwtService,
  ) {}

  async register(user: Users) {
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

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
