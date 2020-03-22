import { Controller, Inject, Body, Get, Post, Put, Delete } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from '../database/models/user.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService
    ) { }

    @Get()
    getUsers(): Promise<Array<User>> {
        return this.userService.getAll();
    }

    @Delete('delete')
    deleteUser(@Body('id') id: number): Promise<any> {
        return this.userService.delete(id);
    }

    @Post('create')
    cerateUser(@Body() body: CreateUserDto): Promise<any> {
        return this.userService.create(body);
    }

    @Put('update')
    updateUser(@Body() body: UpdateUserDto): Promise<any> {
        return this.userService.update(body);
    }
}