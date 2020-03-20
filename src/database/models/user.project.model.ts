import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

import { Project } from './project.model';
import { User } from './user.model';

@Table({ timestamps: false })
export class UserProject extends Model<UserProject> {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey(() => Project)
    @Column(DataType.INTEGER)
    projectId: number;
}