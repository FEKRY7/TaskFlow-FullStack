import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

import { AuthGuard } from 'src/guards/auth.guard';
import { AuthRolesGuard } from 'src/guards/auth.roles.guard';

import { Roles } from 'src/Users/decorators/user-role.decorator';
import { CurrentUser } from 'src/Users/decorators/current-user.decorator';

import * as types from 'src/untils/types';
import {
  UserRole,
  TaskPriority,
  TaskStatus,
} from 'src/untils/enums';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('api/tasks')
@UseGuards(AuthGuard, AuthRolesGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  // Create Task
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Create a new task',
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async create(
    @CurrentUser() payload: types.JWTPayloadType,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(
      payload.id,
      createTaskDto,
    );
  }

  // Get All Tasks
  @Get()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Get all tasks',
  })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
  })
  async getAllTasks(
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.taskService.getAllTasks(
      payload.id,
      payload.role as UserRole,
    );
  }

  // Filter Tasks
  @Get('filter')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Filter tasks',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: TaskPriority,
  })
  @ApiQuery({
    name: 'assigneeId',
    required: false,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered tasks retrieved successfully',
  })
  async filterTasks(
    @CurrentUser() payload: types.JWTPayloadType,
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('assigneeId') assigneeId?: number,
  ) {
    return this.taskService.filterTasks(
      payload.id,
      payload.role as UserRole,
      status,
      priority,
      assigneeId,
    );
  }

  // Get Task By Id
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Get task by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.taskService.getTaskById(
      id,
      payload.id,
      payload.role as UserRole,
    );
  }

  // Update Task
  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Update task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPayloadType,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(
      id,
      payload.id,
      payload.role as UserRole,
      updateTaskDto,
    );
  }

  // Delete Task
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Delete task',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.taskService.deleteTask(
      id,
      payload.id,
      payload.role as UserRole,
    );
  }
}