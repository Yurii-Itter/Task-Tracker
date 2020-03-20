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

    @Column(DataType.STRING)
    status: string;

    @Column(DataType.INTEGER)
    userId: number;
}