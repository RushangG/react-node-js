import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppDataSource } from '../data-source';
import { Users } from './entities/users.entity';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepos = AppDataSource.getRepository(Users),
  ) {}

  async create(createUserDto: CreateUserDto) {
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
}
