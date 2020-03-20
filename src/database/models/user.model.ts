import { Table, Column, Model, PrimaryKey, DataType, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';

import { Task } from './task.model';

@Table({ timestamps: false })
export class User extends Model<User> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @HasMany(() => Task, { foreignKey: 'userId', sourceKey: 'id' })
    tasks: Array<Task>;
}