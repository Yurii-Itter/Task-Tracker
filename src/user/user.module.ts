import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';

import { UserController } from './user.controller';

import { UserService } from './user.service';

@Module({
    imports: [CommonModule, DatabaseModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
