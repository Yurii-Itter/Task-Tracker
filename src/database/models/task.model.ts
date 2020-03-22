import { Table, Column, Model, PrimaryKey, DataType, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { User } from './user.model';

@Table({ timestamps: false })
export class Task extends Model<Task> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    title: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    status: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @BelongsTo(() => User)
    user: User;
}