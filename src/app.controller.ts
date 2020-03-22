import { Controller, Inject, Param, Body, Get, Post, Put, Delete, Patch } from '@nestjs/common';

import { UserService } from './database/user.service';
import { TaskService } from './database/task.service';

import { User } from './database/models/user.model';
import { Task } from './database/models/task.model';

import { Error } from './database/interfaces/error.interface';

import { CreateUserDto } from './database/dto/create-user.dto';
import { CreateTaskDto } from './database/dto/create-task.dto';
import { UpdateUserDto } from './database/dto/update-user.dto';
import { UpdateTaskDto } from './database/dto/update-task.dto';
import { SetTaskUserDto } from './database/dto/set-task-user.dto';
import { SetTaskStatusDto } from './database/dto/set-task-status.dto';

@Controller()
export class AppController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(TaskService) private readonly taskService: TaskService,
    ) { }

    @Get('/users')
    getUsers(): Promise<Array<User> | Error> {
        return this.userService.getAll();
    }

    @Get('/tasks/:filter?')
    getTasks(@Param('filter') filter: string): Promise<Array<Task> | Error> {
        return this.taskService.getAll(filter);
    }

    @Delete('/tasks/:id/delete')
    deleteTask(@Param('id') id: number): Promise<any | Error> {
        return this.taskService.delete(id);
    }

    @Delete('/users/:id/delete')
    deleteUser(@Param('id') id: number): Promise<any | Error> {
        return this.userService.delete(id);
    }

    @Post('/tasks/create')
    cerateTask(@Body() body: CreateTaskDto): Promise<Task | Error> {
        return this.taskService.create(body);
    }

    @Post('/users/create')
    cerateUser(@Body() body: CreateUserDto): Promise<User | Error> {
        console.log(body);
        return this.userService.create(body);
    }

    @Put('/tasks/update')
    updateTask(@Body() body: UpdateTaskDto): Promise<any | Error> {
        return this.taskService.update(body);
    }

    @Put('/users/update')
    updateUser(@Body() body: UpdateUserDto): Promise<any | Error> {
        return this.userService.update(body);
    }

    @Patch('/tasks/:id/user')
    setTaskUser(@Body() body: SetTaskUserDto): Promise<any | Error> {
        return this.taskService.setUser(body);
    }

    @Patch('/tasks/:id/status')
    setTaskStatus(@Body() body: SetTaskStatusDto): Promise<any | Error> {
        return this.taskService.setStatus(body);
    }
}