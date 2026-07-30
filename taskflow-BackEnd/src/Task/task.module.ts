import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/Users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/Users/users.entity';
import { Task } from './task.entity';
import { Project } from 'src/Project/project.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';


@Module({
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task, Project, User]),
    UsersModule,
    JwtModule,
  ],
})
export class TasksModule {}