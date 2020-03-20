import { Sequelize } from 'sequelize-typescript';

import { ConfigService } from '../common/config.service';

import { CommonModule } from '../common/common.module';

import { Task } from './models/task.model';
import { User } from './models/user.model';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        imports: [CommonModule],
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                database: configService.get('DATABASE'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
            });
            sequelize.addModels([Task, User]);
            await sequelize.sync({ force: true });
            return sequelize;
        },
        inject: [ConfigService]
    },
    {
        provide: 'TASKS_REPOSITORY',
        useValue: Task
    },
    {
        provide: 'USERS_REPOSITORY',
        useValue: User
    }
];