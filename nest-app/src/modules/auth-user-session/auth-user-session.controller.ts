import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthUserSessionService } from './auth-user-session.service';
import { CreateAuthUserSessionDto } from './dto/create-auth-user-session.dto';
import { UpdateAuthUserSessionDto } from './dto/update-auth-user-session.dto';

@Controller('auth-user-session')
export class AuthUserSessionController {
  constructor(private readonly authUserSessionService: AuthUserSessionService) {}

  @Post()
  create(@Body() createAuthUserSessionDto: CreateAuthUserSessionDto) {
    return this.authUserSessionService.create(createAuthUserSessionDto);
  }

  @Get()
  findAll() {
    return this.authUserSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authUserSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthUserSessionDto: UpdateAuthUserSessionDto) {
    return this.authUserSessionService.update(+id, updateAuthUserSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authUserSessionService.remove(+id);
  }
}
