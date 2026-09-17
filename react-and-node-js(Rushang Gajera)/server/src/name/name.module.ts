import { Module } from '@nestjs/common';
import { NameService } from './name.service';
import { NameController } from './name.controller';
import { Name } from './entities/name.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Name]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  ],
  controllers: [NameController],
  providers: [NameService],
})
export class NameModule {}
