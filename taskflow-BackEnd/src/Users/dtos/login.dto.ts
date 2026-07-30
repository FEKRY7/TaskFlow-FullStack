import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
    maxLength: 250,
  })
  @IsEmail()
  @MaxLength(250)
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password@123',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password!: string;
}