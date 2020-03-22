import { IsNotEmpty, IsNumber } from 'class-validator'

export class SetTaskUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}