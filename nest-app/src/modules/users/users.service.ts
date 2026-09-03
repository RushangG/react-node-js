import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppDataSource } from '../../data-source';
import { Users } from './entities/users.entity';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepos = AppDataSource.getRepository(Users),
    // private entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto || !createUserDto.email) {
      throw new BadRequestException('Email is required to register');
    }

    console.log('Received createUserDto:', createUserDto); // Log the received DTO
    const user = await this.usersRepos.create(createUserDto);
    console.log('Created user:', user); // Log the created user object

    user.password = bcrypt.hashSync(user.password, 10); // Hash the password before saving

    return await this.usersRepos.save(user);
  }

  async findAll() {
    const users = await this.usersRepos.find({
      relations: {
        products: true, // Assuming you have a relation named 'products' in the Users entity
        roles: true, // Assuming you have a relation named 'roles' in the Users entity
      },
    });

    if (!users) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepos.findOne({
      relations: {
        products: true,
      },
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepos.findOneBy({ id: id });
    if (!user || user === null) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = Object.assign(user, updateUserDto);
    updatedUser.password = bcrypt.hashSync(updatedUser.password, 10); // Hash the password before saving

    return await this.usersRepos.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.usersRepos.findOneBy({ id });
    if (!user || user === null) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepos.delete({ id: id });
    return { message: 'User deleted successfully' };
  }

  async userRoleCreate(userId: number, roleId: number) {
    // const userRoleRepo = await this.entityManager
    //   .createQueryBuilder()
    //   .select('*')
    //   .from('users_roles', 'users_roles')
    //   .getRawMany();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const entityManager = AppDataSource.manager;
    const userRoleRepo = await entityManager
      .createQueryBuilder()
      .insert()
      .into('users_roles')
      .values({ usersId: userId, rolesId: roleId })
      .execute();

    console.log('userRoleCreate result:', userRoleRepo); // Log the result of the save operation

    return userRoleRepo;
  }
}
