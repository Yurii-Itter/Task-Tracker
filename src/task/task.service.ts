import { Injectable, Inject, Logger } from '@nestjs/common';

import { Task } from '../database/models/task.model';
import { User } from '../database/models/user.model';

import { UserService } from '../user/user.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { SetTaskStatusDto } from './dto/set-task-status.dto';
import { SetTaskUserDto } from './dto/set-task-user.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { ResponseInterface } from '../common/interfaces/response.interface';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASKS_REPOSITORY') private readonly tasksRepository: typeof Task,
        @Inject(UserService) private readonly usersService: UserService,
        @Inject(Logger) private readonly logger: Logger
    ) { }

    public async get(id: number): Promise<ResponseInterface> {
        try {
            const data = await this.tasksRepository.findOne({ where: { id }, include: [User] });
            return { status: 'success', data };
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async getAll(status?: string): Promise<ResponseInterface> {
        try {
            let data: any;
            if (status === 'todo') {
                data = await this.tasksRepository.findAll({ where: { status: 'To Do' }, order: [['id', 'ASC']], include: [User] });
            } else if (status === 'inprogress') {
                data = await this.tasksRepository.findAll({ where: { status: 'In Progress' }, order: [['id', 'ASC']], include: [User] });
            } else if (status === 'done') {
                data = await this.tasksRepository.findAll({ where: { status: 'Done' }, order: [['id', 'ASC']], include: [User] });
            } else {
                data = await this.tasksRepository.findAll({ order: [['id', 'ASC']], include: [User] });
            }
            return { status: 'success', data };
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async create({ title, description, userId }: CreateTaskDto): Promise<ResponseInterface> {
        try {
            if (userId && (await this.usersService.get(userId)).data) {
                await this.tasksRepository.create({ title, description, status: "To Do", userId });
            } else {
                await this.tasksRepository.create({ title, description, status: "To Do" });
            }
            return { status: 'success' };
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async update({ id, title, description }: UpdateTaskDto): Promise<ResponseInterface> {
        try {
            if ((await this.get(id)).data) {
                await this.tasksRepository.update({ title, description }, { where: { id } });
                return { status: 'success' };
            } else {
                return { status: 'failure', message: `There is no task with id ${id}` };
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async setStatus({ id, status }: SetTaskStatusDto): Promise<ResponseInterface> {
        try {
            if ((await this.get(id)).data) {
                await this.tasksRepository.update({ status }, { where: { id } });
                return { status: 'success' };
            } else {
                return { status: 'failure', message: `There is no task with id ${id}` };
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async setUser({ id, userId }: SetTaskUserDto): Promise<ResponseInterface> {
        try {
            if ((await this.usersService.get(userId)).data && (await this.get(id)).data) {
                await this.tasksRepository.update({ userId }, { where: { id } });
                return { status: 'success' };
            } else {
                if (!(await this.usersService.get(userId)).data) {
                    return { status: 'failure', message: `There is no user with id ${userId}` };
                } else if (!(await this.get(id)).data) {
                    return { status: 'failure', message: `There is no task with id ${id}` };
                }
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async delete(id: number): Promise<ResponseInterface> {
        try {
            if ((await this.get(id)).data) {
                await this.tasksRepository.destroy({ where: { id } });
                return { status: 'success' };
            } else {
                return { status: 'failure', message: `There is no task with id ${id}` };
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }
}