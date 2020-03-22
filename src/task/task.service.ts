import { Injectable, Inject, Logger } from '@nestjs/common';

import { Task } from '../database/models/task.model';
import { User } from '../database/models/user.model';

import { UserService } from '../user/user.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { SetTaskStatusDto } from './dto/set-task-status.dto';
import { SetTaskUserDto } from './dto/set-task-user.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASKS_REPOSITORY') private readonly tasksRepository: typeof Task,
        @Inject(UserService) private readonly usersService: UserService,
        @Inject(Logger) private readonly logger: Logger
    ) { }

    public async getAll(status?: string): Promise<Array<Task>> {
        try {
            if (status === 'todo') {
                return this.tasksRepository.findAll({ where: { status: 'To Do' }, order: [['id', 'ASC']], include: [User] });
            } else if (status === 'inprogress') {
                return this.tasksRepository.findAll({ where: { status: 'In Progress' }, order: [['id', 'ASC']], include: [User] });
            } else if (status === 'done') {
                return this.tasksRepository.findAll({ where: { status: 'Done' }, order: [['id', 'ASC']], include: [User] });
            } else {
                return this.tasksRepository.findAll({ order: [['id', 'ASC']], include: [User] });
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    // Flag
    public async create({ title, description, userId }: CreateTaskDto): Promise<Task> {
        try {
            if (userId && this.usersService.get(userId)) {
                return this.tasksRepository.create({ title, description, status: "To Do", userId });
            } else {
                return this.tasksRepository.create({ title, description, status: "To Do" });
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async update({ id, title, description }: UpdateTaskDto): Promise<any> {
        try {
            return this.tasksRepository.update({ title, description }, { where: { id } });
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async setStatus({ id, status }: SetTaskStatusDto): Promise<any> {
        try {
            return this.tasksRepository.update({ status }, { where: { id } });
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async setUser({ id, userId }: SetTaskUserDto): Promise<any> {
        try {
            if (this.usersService.get(userId)) {
                return this.tasksRepository.update({ userId }, { where: { id } });
            } else {
                return { error: 'User is invalid' };
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async delete(id: number): Promise<any> {
        try {
            return this.tasksRepository.destroy({ where: { id } });
        } catch (error) {
            this.logger.error(error);
        }
    }
}