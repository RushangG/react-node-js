import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  course: string;
}
