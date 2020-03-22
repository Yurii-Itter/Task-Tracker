import { Injectable, Inject, Logger } from '@nestjs/common';

import { User } from './models/user.model';
import { Task } from './models/task.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Error } from './interfaces/error.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User,
        @Inject(Logger) private readonly logger: Logger
    ) { }

    public async getAll(): Promise<Array<User> | Error> {
        try {
            return this.usersRepository.findAll({ include: [Task] });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async get(id: number): Promise<User | Error> {
        try {
            return this.usersRepository.findOne({ where: { id }, include: [Task] });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async create({ firstName, lastName }: CreateUserDto): Promise<User | Error> {
        try {
            return this.usersRepository.create({ firstName, lastName });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async update({ id, firstName, lastName }: UpdateUserDto): Promise<any | Error> {
        try {
            return this.usersRepository.update({ firstName, lastName }, { where: { id } });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }

    public async delete(id: number): Promise<number | Error> {
        try {
            return this.usersRepository.destroy({ where: { id } });
        } catch (error) {
            this.logger.error(error);
            return { error };
        }
    }
}