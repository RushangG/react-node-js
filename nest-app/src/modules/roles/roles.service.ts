import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AppDataSource } from '../../data-source';
import { Roles } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepos: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.rolesRepos.save(createRoleDto);

      console.log('Created role:', role); // Log the created role object
      if (!role) {
        throw new NotAcceptableException('Failed to create role');
      }
      return role;
    } catch (error: any) {
      throw new NotAcceptableException(
        'Failed to create role due to database error: ' + error.message,
      );
    }
  }

  findAll() {
    const roles = this.rolesRepos.find();
    if (!roles) {
      throw new NotFoundException('No roles found');
    }
    return roles;
  }

  findOne(id: number) {
    const role = this.rolesRepos.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepos.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    try {
      await this.rolesRepos.update({ id }, updateRoleDto);
    } catch (error: any) {
      throw new NotAcceptableException(
        'Failed to update role due to database error: ' + error.message,
      );
    }
    return 'successfully updated';
  }

  async remove(id: number) {
    const role = await this.rolesRepos.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    let result = await this.rolesRepos.delete({ id });

    return result;
  }
}
