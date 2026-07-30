import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import * as types from '../untils/types';

@ApiTags('Authentication')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // POST: /api/users/auth/signup
  @Post('auth/signUp')
  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  public async registerUser(@Body() Body: RegisterDto) {
    return await this.usersService.SignUp(Body);
  }

  // POST: /api/users/auth/login
  @Post('auth/login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  public async login(@Body() Body: LoginDto) {
    return await this.usersService.login(Body);
  }

  // GET: /api/users/current-user
  @Get('current-user')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current logged in user',
  })
  @UseGuards(AuthGuard)
  public async GetLogginUserProfile(@CurrentUser() payload: types.JWTPayloadType) {
    return await this.usersService.getCurrentUser(payload.id);
  }
}
