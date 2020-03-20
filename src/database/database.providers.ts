import { Sequelize } from 'sequelize-typescript';

import { Task } from './models/task.model';
import { Project } from './models/project.model';
import { User } from './models/user.model';
import { UserProject } from './models/user.project.model';
import { Role } from './models/role.model';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize('');
            sequelize.addModels([Task, Project, User, UserProject, Role]);
            await sequelize.sync();
            return sequelize;
        },
    },
];