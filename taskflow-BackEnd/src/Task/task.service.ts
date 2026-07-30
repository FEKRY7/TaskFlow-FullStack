import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { User } from '../Users/users.entity';

import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus, TaskPriority, UserRole } from 'src/untils/enums';
import { Project } from 'src/Project/project.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // Create Task
    async create(
        currentUserId: number,
        createTaskDto: CreateTaskDto,
    ): Promise<Task> {
        const {
            projectId,
            assigneeId,
        } = createTaskDto;

        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: {
                owner: true,
                members: true,
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        const hasAccess =
            project.owner.id === currentUserId ||
            project.members.some((member) => member.id === currentUserId);

        if (!hasAccess) {
            throw new ForbiddenException(
                'You are not allowed to access this project',
            );
        }

        const creator = await this.userRepository.findOne({
            where: { id: currentUserId },
        });

        if (!creator) {
            throw new NotFoundException('Creator not found');
        }

        let assignee: User | null = null;

        if (assigneeId) {
            assignee = await this.userRepository.findOne({
                where: { id: assigneeId },
            });

            if (!assignee) {
                throw new NotFoundException('Assignee not found');
            }
        }

        if (
            assignee &&
            !project.members.some(member => member.id === assignee.id)
        ) {
            throw new ForbiddenException(
                'Assignee must be a member of this project',
            );
        }

        const task = this.taskRepository.create({
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: createTaskDto.status,
            priority: createTaskDto.priority,
            dueDate: createTaskDto.dueDate,
            project: project,
            creator: creator,
            assignee: assignee ?? undefined,
        });

        return await this.taskRepository.save(task);
    }

    // Get All Tasks
    async getAllTasks(
        currentUserId: number,
        currentUserRole: UserRole,
    ): Promise<Task[]> {

        if (currentUserRole === UserRole.ADMIN) {
            return await this.taskRepository.find({
                relations: {
                    project: true,
                    creator: true,
                    assignee: true,
                },
                order: {
                    createdAt: 'DESC',
                },
            });
        }

        return await this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.project', 'project')
            .leftJoinAndSelect('project.owner', 'owner')
            .leftJoinAndSelect('project.members', 'member')
            .leftJoinAndSelect('task.creator', 'creator')
            .leftJoinAndSelect('task.assignee', 'assignee')
            .where('owner.id = :userId', { userId: currentUserId })
            .orWhere('member.id = :userId', { userId: currentUserId })
            .orderBy('task.createdAt', 'DESC')
            .getMany();
    }

    // Get Task By Id
    async getTaskById(
        id: number,
        currentUserId: number,
        currentUserRole: UserRole,
    ): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: {
                project: {
                    owner: true,
                    members: true,
                },
                creator: true,
                assignee: true,
            },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (currentUserRole === UserRole.ADMIN) {
            return task;
        }

        const hasAccess =
            task.project.owner.id === currentUserId ||
            task.project.members.some(
                (member) => member.id === currentUserId,
            );

        if (!hasAccess) {
            throw new ForbiddenException(
                'You are not allowed to access this task',
            );
        }

        return task;
    }

    // Update Task
    async updateTask(
        id: number,
        currentUserId: number,
        currentUserRole: UserRole,
        updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        const task = await this.getTaskById(
            id,
            currentUserId,
            currentUserRole,
        );

        if (
            task.creator.id !== currentUserId &&
            currentUserRole !== UserRole.ADMIN
        ) {
            throw new ForbiddenException('Access denied');
        }

        Object.assign(task, updateTaskDto);

        return await this.taskRepository.save(task);
    }

    // Delete Task
    async deleteTask(
        id: number,
        currentUserId: number,
        currentUserRole: UserRole,
    ): Promise<{ message: string }> {
        const task = await this.getTaskById(
            id,
            currentUserId,
            currentUserRole,
        );

        if (
            task.creator.id !== currentUserId &&
            currentUserRole !== UserRole.ADMIN
        ) {
            throw new ForbiddenException('Access denied');
        }

        await this.taskRepository.remove(task);

        return {
            message: 'Task deleted successfully',
        };
    }

    // Filter Tasks
    async filterTasks(
        currentUserId: number,
        currentUserRole: UserRole,
        status?: TaskStatus,
        priority?: TaskPriority,
        assigneeId?: number,
    ): Promise<Task[]> {
        const query = this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.project', 'project')
            .leftJoinAndSelect('project.owner', 'owner')
            .leftJoinAndSelect('project.members', 'member')
            .leftJoinAndSelect('task.creator', 'creator')
            .leftJoinAndSelect('task.assignee', 'assignee');

        if (currentUserRole !== UserRole.ADMIN) {
            query.andWhere(
                '(owner.id = :userId OR member.id = :userId)',
                {
                    userId: currentUserId,
                },
            );
        }

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (priority) {
            query.andWhere('task.priority = :priority', { priority });
        }

        if (assigneeId) {
            query.andWhere('assignee.id = :assigneeId', {
                assigneeId,
            });
        }

        return await query.getMany();
    }
}