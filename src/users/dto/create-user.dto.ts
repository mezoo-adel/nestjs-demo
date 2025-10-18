import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsEnum(['admin', 'user'], { message: 'Role must be admin or user' })
  role: string;
  @IsPositive()
  age: number;
}
