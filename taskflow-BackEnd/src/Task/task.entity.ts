import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Project } from '../Project/project.entity';
import { TaskPriority, TaskStatus } from 'src/untils/enums';
import { User } from 'src/Users/users.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 150,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status!: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority!: TaskPriority;

  @Column({
    type: 'timestamp',
  })
  dueDate!: Date;

  // Project
  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  project!: Project;

  // Task Creator
  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  creator!: User;

  // Assigned User
  @ManyToOne(() => User, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  assignee!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}