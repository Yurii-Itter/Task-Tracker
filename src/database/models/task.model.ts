import { Table, Column, Model, PrimaryKey, DataType, HasOne } from 'sequelize-typescript';

import { Project } from './project.model';
import { User } from './user.model';

@Table({ timestamps: false })
export class Task extends Model<Task> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    title: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.BOOLEAN)
    active: boolean;

    @Column(DataType.BOOLEAN)
    review: boolean;

    @Column(DataType.BOOLEAN)
    finished: boolean;

    @Column(DataType.INTEGER)
    userId: number;

    @Column(DataType.INTEGER)
    projectId: number;

    @HasOne(() => User, { foreignKey: 'id', sourceKey: 'userId' })
    user: User;

    @HasOne(() => Project, { foreignKey: 'id', sourceKey: 'projectId' })
    project: Project;
}