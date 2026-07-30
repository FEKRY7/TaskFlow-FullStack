import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Full name',
    example: 'Ahmed Mohamed',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  userName!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'ahmed@example.com',
    maxLength: 250,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password@123',
    minLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password!: string;
}