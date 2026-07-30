import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

import { AuthGuard } from '../guards/auth.guard';
import { AuthRolesGuard } from '../guards/auth.roles.guard';

import { Roles } from '../Users/decorators/user-role.decorator';
import { CurrentUser } from '../Users/decorators/current-user.decorator';

import * as types from '../untils/types';
import { UserRole } from '../untils/enums';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('api/projects')
@UseGuards(AuthGuard, AuthRolesGuard)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  // Create Project
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Create a new project',
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
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
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(
      payload.id,
      createProjectDto,
    );
  }

  // Get My Projects
  @Get()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Get all projects for current user',
  })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMyProjects(
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.projectService.getMyProjects(
      payload.id,
      payload.role as UserRole,
    );
  }

  // Get Project By Id
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Get project by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async getProjectById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.projectService.getProjectById(
      id,
      payload.id,
    );
  }

  // Update Project
  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Update project',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPayloadType,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(
      id,
      payload.id,
      payload.role as UserRole,
      updateProjectDto,
    );
  }

  // Delete Project
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @ApiOperation({
    summary: 'Delete project',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.projectService.delete(
      id,
      payload.id,
      payload.role as UserRole,
    );
  }

  // Add Project Member
  @Post(':id/members/:memberId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Add member to project',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Member added successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project or User not found',
  })
  async addMember(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.projectService.addMember(
      projectId,
      payload.id,
      payload.role as UserRole,
      memberId,
    );
  }

  // Remove Project Member
  @Delete(':id/members/:memberId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Remove member from project',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiParam({
    name: 'memberId',
    type: Number,
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Member removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project or Member not found',
  })
  async removeMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @CurrentUser() payload: types.JWTPayloadType,
  ) {
    return this.projectService.removeMember(
      id,
      payload.id,
      payload.role as UserRole,
      memberId,
    );
  }
}