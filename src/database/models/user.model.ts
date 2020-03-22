import { Table, Column, Model, PrimaryKey, DataType, AutoIncrement, HasMany } from 'sequelize-typescript';

import { Task } from './task.model';

@Table({ timestamps: false })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @HasMany(() => Task)
    tasks: Array<Task>
}