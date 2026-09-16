import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';

@Injectable()
export class NameService {
  private Names: CreateNameDto[] = [];
  private id: number = 1;
  create(createNameDto: CreateNameDto) {
    createNameDto.id = this.id++;
    this.Names.push(createNameDto);

    return this.Names;
  }

  findAll() {
    return this.Names;
  }

  findOne(id: number) {
    let Name = this.Names.find((name) => name.id === id);
    if (!Name) {
      throw new NotFoundException(`Not found Name`);
    }

    return Name;
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

  remove(id: number) {
    let indexName = this.Names.findIndex((name) => name.id === id);

    if (indexName !== -1) {
      this.Names.splice(indexName, 1);
    } else {
      throw new NotFoundException(`Not found Name`);
    }

    return `This action removes a #${id} name`;
  }
}
