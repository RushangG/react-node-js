import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { Name } from './entities/name.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
@Injectable()
export class NameService {
  constructor(
    @InjectRepository(Name)
    private nameRepo: Repository<Name>,

    private userService: UsersService,
  ) {}

  private Names: CreateNameDto[] = [];
  private id: number = 1;
  async create(createNameDto: CreateNameDto, userId: number) {
    try {
      let User = await this.userService.findOne(userId);

      let newName = await this.nameRepo.create({
        ...createNameDto,
        user_id: User,
      });
      let saveName = await this.nameRepo.save(newName);

      return saveName;
    } catch (err) {
      throw new ConflictException(`Username or email already existing`);
    }
    // createNameDto.id = this.id++;
    // this.Names.push(createNameDto);
    // return this.Names;
  }

  findAll(userId: number) {
    let names = this.nameRepo.find({
      where: {
        user_id: { id: userId },
      },
    });
    return names;

    // basic array method.
    // return this.Names;
  }

  adminFindAll() {
    let names = this.nameRepo.find({
      relations: {
        user_id: true,
      },

      // select: {
      //   user_id: {
      //     username: true,
      //   },
      // },
    });

    return names;
  }

  async findOne(id: number, userId: number) {
    let name = await this.nameRepo.findOne({
      where: {
        id: id,
        user_id: { id: userId },
      },
    });

    if (!name) {
      throw new NotFoundException(`Not found Name`);
    }
    return name;

    // let Name = this.Names.find((name) => name.id === id);
    // if (!Name) {
    //   throw new NotFoundException(`Not found Name`);
    // }

    // return Name;
  }

  async update(id: number, updateNameDto: UpdateNameDto) {
    let name = await this.nameRepo.findOneBy({ id: id });

    if (!name) {
      throw new NotFoundException(`Name not Found`);
    }

    try {
      let updateName = await this.nameRepo.update({ id }, { ...updateNameDto });

      return await this.nameRepo.findOneBy({ id });
    } catch (err) {
      throw new ConflictException(err);
    }

    // let indexName = this.Names.findIndex((name) => name.id === id);

    // updateNameDto.id = id;
    // if (indexName !== -1) {
    //   this.Names[indexName] = updateNameDto;
    // } else {
    //   throw new NotFoundException(`Not found Name`);
    // }

    // return this.Names[indexName];
  }

  async remove(id: number) {
    let name = await this.nameRepo.findOneBy({ id });

    if (!name) {
      throw new NotFoundException(`Not found Name for delete`);
    }

    await this.nameRepo.delete({ id });

    return `delete name succesfully`;

    // let indexName = this.Names.findIndex((name) => name.id === id);

    // if (indexName !== -1) {
    //   this.Names.splice(indexName, 1);
    // } else {
    //   throw new NotFoundException(`Not found Name`);
    // }

    // return `This action removes a #${id} name`;
  }
}
