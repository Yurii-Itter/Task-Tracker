import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot(), CommonModule, DatabaseModule, UserModule, TaskModule]
})
export class AppModule { }