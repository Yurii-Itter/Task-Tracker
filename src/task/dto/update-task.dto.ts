import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}