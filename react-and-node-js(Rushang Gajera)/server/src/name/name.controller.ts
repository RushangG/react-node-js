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
  UseGuards,
  Req,
} from '@nestjs/common';
import { NameService } from './name.service';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@Controller('name')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post()
  create(@Body() createNameDto: CreateNameDto, @Req() req: any) {
  

    let userId = req.user.userId;

    return this.nameService.create(createNameDto, userId);
  }

  @Get()
  findAll(@Req() req: any) {
    let userId = req.user.userId;
    return this.nameService.findAll(userId);
  }

  @Get('admin')
  @Roles('admin')
  adminFindAll() {
    return this.nameService.adminFindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    let userId = req.user.userId;
    return this.nameService.findOne(+id, userId);
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
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.nameService.remove(+id);
  }
}
