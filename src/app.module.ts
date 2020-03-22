import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), CommonModule, DatabaseModule],
  controllers: [AppController]
})
export class AppModule { }