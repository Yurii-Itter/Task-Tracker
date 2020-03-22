import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator'

export class SetTaskStatusDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsIn(['To Do', 'In Progress', 'Done'])
    status: string;
}