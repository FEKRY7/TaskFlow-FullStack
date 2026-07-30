import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { User } from 'src/Users/users.entity';
import { UserRole } from 'src/untils/enums';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // Create Project
    async create(
        userId: number,
        createProjectDto: CreateProjectDto,
    ): Promise<Project> {
        const owner = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!owner) {
            throw new NotFoundException('User not found');
        }

        const project = this.projectRepository.create({
            name: createProjectDto.name,
            description: createProjectDto.description,
            owner,
            members: [owner],
        });

        return await this.projectRepository.save(project);
    }



    // Get My Projects
    async getMyProjects(
        userId: number,
        userRole: UserRole,
    ): Promise<Project[]> {
        // Admin يشوف كل المشاريع
        if (userRole === UserRole.ADMIN) {
            return await this.projectRepository.find({
                relations: {
                    owner: true,
                    members: true,
                },
            });
        }

        // Member يشوف المشاريع اللي هو Owner أو Member فيها
        return await this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.owner', 'owner')
            .leftJoinAndSelect('project.members', 'member')
            .where('owner.id = :userId', { userId })
            .orWhere('member.id = :userId', { userId })
            .getMany();
    }

    // Get Project By Id
    async getProjectById(
        projectId: number,
        userId: number,
    ): Promise<Project> {
        const project = await this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.owner', 'owner')
            .leftJoinAndSelect('project.members', 'member')
            .where('project.id = :projectId', { projectId })
            .getOne();

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project;
    }

    // Update Project
    async update(
        projectId: number,
        userId: number,
        userRole: UserRole,
        updateProjectDto: UpdateProjectDto,
    ): Promise<Project> {
        const project = await this.getProjectById(projectId, userId);

        if (
            project.owner.id !== userId &&
            userRole !== UserRole.ADMIN
        ) {
            throw new ForbiddenException(
                'Only the project owner or admin can update this project',
            );
        }

        Object.assign(project, updateProjectDto);

        return await this.projectRepository.save(project);
    }

    // Delete Project
    async delete(
        projectId: number,
        userId: number,
        userRole: UserRole,
    ): Promise<{ message: string }> {
        const project = await this.getProjectById(
            projectId,
            userId,
        );

        if (
            project.owner.id !== userId &&
            userRole !== UserRole.ADMIN
        ) {
            throw new ForbiddenException(
                'Only the project owner or admin can delete this project',
            );
        }

        await this.projectRepository.remove(project);

        return {
            message: 'Project deleted successfully',
        };
    }

    // Add Member
    async addMember(
        projectId: number,
        ownerId: number,
        userRole: UserRole,
        memberId: number,
    ): Promise<Project> {
        const project = await this.getProjectById(projectId, ownerId);

        // Only Owner or Admin
        if (
            project.owner.id !== ownerId &&
            userRole !== UserRole.ADMIN
        ) {
            throw new ForbiddenException(
                'Only the project owner or admin can add members',
            );
        }

        const member = await this.userRepository.findOne({
            where: { id: memberId },
        });

        if (!member) {
            throw new NotFoundException('User not found');
        }

        const exists = project.members.some(
            (user) => user.id === member.id,
        );

        if (exists) {
            throw new BadRequestException(
                'User already joined this project',
            );
        }

        project.members.push(member);

        return await this.projectRepository.save(project);
    }

    // Remove Member
    async removeMember(
        projectId: number,
        ownerId: number,
        userRole: UserRole,
        memberId: number,
    ): Promise<Project> {
        const project = await this.getProjectById(
            projectId,
            ownerId,
        );

        // Only Owner or Admin
        if (
            project.owner.id !== ownerId &&
            userRole !== UserRole.ADMIN
        ) {
            throw new ForbiddenException(
                'Only the project owner or admin can remove members',
            );
        }

        const member = project.members.find(
            (user) => user.id === memberId,
        );

        if (!member) {
            throw new NotFoundException(
                'Member not found in this project',
            );
        }

        // منع حذف الـ Owner
        if (member.id === project.owner.id) {
            throw new BadRequestException(
                'Project owner cannot be removed',
            );
        }

        project.members = project.members.filter(
            (user) => user.id !== memberId,
        );

        return await this.projectRepository.save(project);
    }
}