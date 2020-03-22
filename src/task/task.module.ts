import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

import { TaskController } from './task.controller';

import { TaskService } from './task.service';

@Module({
    imports: [CommonModule, DatabaseModule, UserModule],
    providers: [TaskService],
    controllers: [TaskController]
})
export class TaskModule { }
