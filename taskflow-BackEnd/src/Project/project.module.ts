import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/Users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Project } from './project.entity';
import { User } from 'src/Users/users.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([Project, User]),
    UsersModule,
    JwtModule,
  ],
})
export class ProjectModule {}