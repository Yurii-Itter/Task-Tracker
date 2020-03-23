import { Controller, Inject, Param, Body, Get, Post, Put, Delete, Patch } from '@nestjs/common';

import { TaskService } from './task.service';

import { Task } from '../database/models/task.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SetTaskUserDto } from './dto/set-task-user.dto';
import { SetTaskStatusDto } from './dto/set-task-status.dto';

import { ResponseInterface } from '../common/interfaces/response.interface';

@Controller('tasks')
export class TaskController {
    constructor(
        @Inject(TaskService) private readonly taskService: TaskService
    ) { }

    @Get()
    getTasks(): Promise<ResponseInterface> {
        return this.taskService.getAll();
    }

    @Get('/sort/:status')
    getFilteredTasks(@Param('status') status: string): Promise<ResponseInterface> {
        return this.taskService.getAll(status);
    }

    @Delete('delete')
    deleteTask(@Body('id') id: number): Promise<ResponseInterface> {
        return this.taskService.delete(id);
    }

    @Post('create')
    cerateTask(@Body() body: CreateTaskDto): Promise<ResponseInterface> {
        return this.taskService.create(body);
    }

    @Put('update')
    updateTask(@Body() body: UpdateTaskDto): Promise<ResponseInterface> {
        return this.taskService.update(body);
    }

    @Patch('user')
    setTaskUser(@Body() body: SetTaskUserDto): Promise<ResponseInterface> {
        return this.taskService.setUser(body);
    }

    @Patch('status')
    setTaskStatus(@Body() body: SetTaskStatusDto): Promise<ResponseInterface> {
        return this.taskService.setStatus(body);
    }
}