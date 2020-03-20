import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Role extends Model<Role> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    role: string;
}