import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesController } from './users-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRoles } from './entities/users-roles.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UsersRoles])],
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
})
export class UsersRolesModule {}
