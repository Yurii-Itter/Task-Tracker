import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    userId?: number;
}