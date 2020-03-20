import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

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
}