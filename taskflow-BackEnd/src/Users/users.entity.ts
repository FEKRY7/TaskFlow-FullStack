import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserRole } from 'src/untils/enums';
import { Exclude } from 'class-transformer';
import { CURRENT_TIMESTAMP } from 'src/untils/constants';
import { Token } from 'src/Token/token.entity';
import { Project } from 'src/Project/project.entity';
import { Task } from 'src/Task/task.entity';


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  userName!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Exclude()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role!: UserRole;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @OneToOne(() => Token, (token) => token.user)
  token!: Token;

  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects!: Project[];

  @ManyToMany(() => Project, (project) => project.members)
  projects!: Project[];

  @OneToMany(() => Task, (task) => task.creator)
  createdTasks!: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks!: Task[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt!: Date;
}