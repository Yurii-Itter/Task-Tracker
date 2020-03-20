import { Table, Column, Model, PrimaryKey, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';

import { Task } from './task.model';
import { User } from './user.model';
import { UserProject } from './user.project.model';

@Table({ timestamps: false })
export class Project extends Model<Project> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    title: string;

    @Column(DataType.STRING)
    description: string;

    @HasMany(() => Task, { foreignKey: 'projectId', sourceKey: 'id' })
    tasks: Array<Task>;

    @BelongsToMany(() => User, () => UserProject)
    users: Array<User>;
}