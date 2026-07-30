import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './Users/users.entity';
import { Token } from './Token/token.entity';
import { UsersModule } from './Users/users.module';
import { TokenModule } from './Token/token.module';
import { PassportModule } from '@nestjs/passport';
import { Project } from './Project/project.entity';
import { Task } from './Task/task.entity';
import { ProjectModule } from './Project/project.module';
import { TasksModule } from './Task/task.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        Token,
        User,
        Project,
        Task,
      ],
    }),
    PassportModule.register({ session: true }),
    TokenModule,
    UsersModule,
    ProjectModule,
    TasksModule,
  ],
})
export class AppModule { }