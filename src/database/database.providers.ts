import { Sequelize } from 'sequelize-typescript';

import { ConfigService } from '../common/config.service';

import { CommonModule } from '../common/common.module';

import { Task } from './models/task.model';
import { Project } from './models/project.model';
import { User } from './models/user.model';
import { UserProject } from './models/user.project.model';
import { Role } from './models/role.model';

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
            sequelize.addModels([Task, Project, User, UserProject, Role]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];