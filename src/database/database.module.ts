import { Module } from '@nestjs/common';

import { databaseProviders } from './database.providers';

import { UserService } from './user.service';
import { TaskService } from './task.service';

import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],
    providers: [...databaseProviders, UserService, TaskService],
    exports: [UserService, TaskService]
})
export class DatabaseModule { }
