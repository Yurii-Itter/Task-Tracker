import { Injectable, Inject } from '@nestjs/common';

import { Task } from './models/task.model';
import { User } from './models/user.model';

@Injectable()
export class DatabaseService {
    constructor(
        @Inject('TASKS_REPOSITORY') private readonly tasksRepository: typeof Task,
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User
    ) { }

    public createUser({ firstName, lastName }): void {

    }
}