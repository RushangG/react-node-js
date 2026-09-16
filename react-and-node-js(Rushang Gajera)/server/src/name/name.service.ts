import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { Name } from './entities/name.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
@Injectable()
export class NameService {
  constructor(
    @InjectRepository(Name)
    private nameRepo: Repository<Name>,
  ) {}

  private Names: CreateNameDto[] = [];
  private id: number = 1;
  create(createNameDto: CreateNameDto) {
    createNameDto.id = this.id++;
    this.Names.push(createNameDto);

    return this.Names;
  }

  findAll() {
    let names = this.nameRepo.find();
    return names;

    // basic array method.
    // return this.Names;
  }

  async findOne(id: number) {
    let name = await this.nameRepo.findOneBy({ id });

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

  update(id: number, updateNameDto: UpdateNameDto) {
    let indexName = this.Names.findIndex((name) => name.id === id);

    updateNameDto.id = id;
    if (indexName !== -1) {
      this.Names[indexName] = updateNameDto;
    } else {
      throw new NotFoundException(`Not found Name`);
    }

    return this.Names[indexName];
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
