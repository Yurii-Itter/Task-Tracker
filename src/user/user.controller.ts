import { Controller, Inject, Body, Get, Post, Put, Delete } from '@nestjs/common';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ResponseInterface } from '../common/interfaces/response.interface';

@Controller('users')
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService
    ) { }

    @Get()
    getUsers(): Promise<ResponseInterface> {
        return this.userService.getAll();
    }

    @Delete('delete')
    deleteUser(@Body('id') id: number): Promise<ResponseInterface> {
        return this.userService.delete(id);
    }

    @Post('create')
    cerateUser(@Body() body: CreateUserDto): Promise<ResponseInterface> {
        return this.userService.create(body);
    }

    @Put('update')
    updateUser(@Body() body: UpdateUserDto): Promise<ResponseInterface> {
        return this.userService.update(body);
    }
}