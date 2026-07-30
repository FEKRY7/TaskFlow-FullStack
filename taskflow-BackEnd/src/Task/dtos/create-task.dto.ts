import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/untils/enums';


export class CreateTaskDto {
  @ApiProperty({
    example: 'Create Login API',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title!: string;

  @ApiPropertyOptional({
    example: 'Implement JWT Authentication',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
  })
  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @ApiProperty({
    example: '2026-08-10',
  })
  @IsDateString()
  dueDate!: Date;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  projectId!: number;

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  assigneeId?: number;
}