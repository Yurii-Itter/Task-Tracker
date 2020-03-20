import { Table, Column, Model, PrimaryKey, DataType, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

import { Task } from './task.model';
import { Project } from './project.model';
import { UserProject } from './user.project.model';
import { Role } from './role.model';

@Table({ timestamps: false })
export class User extends Model<User> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    fullName: string;

    @Column(DataType.STRING)
    position: string;

    @Column(DataType.INTEGER)
    roleId: number;

    @HasOne(() => Role, { foreignKey: 'id', sourceKey: 'roleId' })
    role: Role;

    @HasMany(() => Task, { foreignKey: 'userId', sourceKey: 'id' })
    tasks: Array<Task>;

    @BelongsToMany(() => Project, () => UserProject)
    projects: Array<Project>;
}