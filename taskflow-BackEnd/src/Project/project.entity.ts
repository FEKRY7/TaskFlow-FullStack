import { Task } from 'src/Task/task.entity';
import { User } from 'src/Users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.ownedProjects, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner!: User;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'project_members',
  })
  members!: User[];

  @OneToMany(() => Task, (task) => task.project)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}