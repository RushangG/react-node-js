import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { NameService } from './name.service';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post()
  create(@Body() createNameDto: CreateNameDto) {
    if (!createNameDto.name || !createNameDto.email || !createNameDto.course) {
      throw new BadRequestException(
        `name , email , or course is missing from the request body`,
      );
    }
    return this.nameService.create(createNameDto);
  }

  @Get()
  findAll() {
    return this.nameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nameService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNameDto: UpdateNameDto) {
    if (!updateNameDto.name || !updateNameDto.email || !updateNameDto.course) {
      throw new BadRequestException(
        `name , email , or course is missing from the request body`,
      );
    }

    return this.nameService.update(+id, updateNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nameService.remove(+id);
  }
}
