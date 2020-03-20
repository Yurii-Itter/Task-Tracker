import { Module } from '@nestjs/common';

import { databaseProviders } from './database.providers';

import { DatabaseService } from './database.service';

import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],
    providers: [...databaseProviders, DatabaseService],
    exports: [...databaseProviders, DatabaseService]
})
export class DatabaseModule { }
