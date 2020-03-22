import { Module } from '@nestjs/common';

import { databaseProviders } from './database.providers';

import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommonModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule { }
