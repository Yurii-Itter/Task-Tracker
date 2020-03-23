import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class UpdateUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}