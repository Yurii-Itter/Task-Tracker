import { Injectable, Inject, Logger } from '@nestjs/common';

import { Task } from './models/task.model';
import { User } from './models/user.model';

import { UserService } from './user.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { SetTaskStatusDto } from './dto/set-task-status.dto';
import { SetTaskUserDto } from './dto/set-task-user.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Error } from './interfaces/error.interface';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASKS_REPOSITORY') private readonly tasksRepository: typeof Task,
        @Inject(UserService) private readonly usersService: UserService,
        @Inject(Logger) private readonly logger: Logger
    ) { }

    public async getAll(filter?: string): Promise<Array<Task> | Error> {
        try {
            return this.tasksRepository.findAll({ include: [User] });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async create({ title, description, userId }: CreateTaskDto): Promise<Task | Error> {
        try {
            if (userId && this.usersService.get(userId)) {
                return this.tasksRepository.create({ title, description, status: "To Do", userId });
            } else {
                return this.tasksRepository.create({ title, description, status: "To Do" });
            }
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async update({ id, title, description }: UpdateTaskDto): Promise<any | Error> {
        try {
            return this.tasksRepository.update({ title, description }, { where: { id } });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async setStatus({ id, status }: SetTaskStatusDto): Promise<any | Error> {
        try {
            return this.tasksRepository.update({ status }, { where: { id } });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async setUser({ id, userId }: SetTaskUserDto): Promise<any | Error> {
        try {
            if (this.usersService.get(userId)) {
                return this.tasksRepository.update({ userId }, { where: { id } });
            } else {
                return { error: 'User is invalid' };
            }
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async delete(id: number): Promise<any | Error> {
        try {
            return this.tasksRepository.destroy({ where: { id } });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }
}