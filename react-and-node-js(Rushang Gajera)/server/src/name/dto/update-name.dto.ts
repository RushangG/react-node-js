import { PartialType } from '@nestjs/mapped-types';
import { CreateNameDto } from './create-name.dto';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateNameDto extends PartialType(CreateNameDto) {}
