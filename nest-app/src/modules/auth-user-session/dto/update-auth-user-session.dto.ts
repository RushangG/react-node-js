import { PartialType } from '@nestjs/swagger';
import { CreateAuthUserSessionDto } from './create-auth-user-session.dto';

export class UpdateAuthUserSessionDto extends PartialType(CreateAuthUserSessionDto) {}
