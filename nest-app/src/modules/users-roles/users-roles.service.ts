import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUsersRoleDto } from './dto/create-users-role.dto';
import { UpdateUsersRoleDto } from './dto/update-users-role.dto';
import { AppDataSource } from 'src/data-source';
import { EntityManager, In, Any } from 'typeorm';

@Injectable()
export class UsersRolesService {
  constructor(private entityManager: EntityManager = AppDataSource.manager) {}

  create(createUsersRoleDto: CreateUsersRoleDto) {
    return 'This action adds a new usersRole';
  }

  findAll() {
    return `This action returns all usersRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersRole`;
  }

  update(id: number, updateUsersRoleDto: UpdateUsersRoleDto) {
    return `This action updates a #${id} usersRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersRole`;
  }

  // more efficient way to update user roles
  async userRolesUpdate(userId: number, rolesId: number[]) {
    try {
      await this.entityManager.query(
        `SELECT modify_user_roles($1, $2::integer[])`,
        [userId, rolesId],
      );

      let updatedRoles = await this.entityManager.query(
        `SELECT * FROM users_roles WHERE "userId" = $1`,
        [userId],
      );

      return updatedRoles;
    } catch (error) {
      throw new ConflictException('Error updating user roles: ' + error);
    }
  }
}
