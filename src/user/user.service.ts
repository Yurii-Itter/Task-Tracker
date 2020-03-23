import { Injectable, Inject, Logger } from '@nestjs/common';

import { User } from '../database/models/user.model';
import { Task } from '../database/models/task.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ResponseInterface } from '../common/interfaces/response.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User,
        @Inject('TASKS_REPOSITORY') private readonly tasksRepository: typeof Task,
        @Inject(Logger) private readonly logger: Logger
    ) { }

    public async get(id: number): Promise<ResponseInterface> {
        try {
            const data = await this.usersRepository.findOne({ where: { id }, include: [Task] });
            return { status: 'success', data };
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async getAll(): Promise<ResponseInterface> {
        try {
            const data = await this.usersRepository.findAll({ include: [Task] });
            return { status: 'success', data: JSON.stringify(data) };
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async create({ firstName, lastName }: CreateUserDto): Promise<ResponseInterface> {
        try {
            await this.usersRepository.create({ firstName, lastName });
            return { status: 'success' };
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async update({ id, firstName, lastName }: UpdateUserDto): Promise<ResponseInterface> {
        try {
            if ((await this.get(id)).data) {
                await this.usersRepository.update({ firstName, lastName }, { where: { id } });
                return { status: 'success' };
            } else {
                return { status: 'failure', message: `There is no user with id ${id}` };
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }

    public async delete(id: number): Promise<ResponseInterface> {
        try {
            if ((await this.get(id)).data) {
                const tasks = (await this.get(id)).data.tasks.map(task => task.id);
                await this.tasksRepository.update({ userId: null }, { where: { id: tasks } });
                await this.usersRepository.destroy({ where: { id } });
                return { status: 'success' };
            } else {
                return { status: 'failure', message: `There is no user with id ${id}` };
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'failure', message: error };
        }
    }
}