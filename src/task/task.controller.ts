import { Controller, Inject, Param, Body, Get, Post, Put, Delete, Patch } from '@nestjs/common';

import { TaskService } from './task.service';

import { Task } from '../database/models/task.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SetTaskUserDto } from './dto/set-task-user.dto';
import { SetTaskStatusDto } from './dto/set-task-status.dto';

@Controller('tasks')
export class TaskController {
    constructor(
        @Inject(TaskService) private readonly taskService: TaskService
    ) { }

    @Get()
    getTasks(): Promise<Array<Task>> {
        return this.taskService.getAll();
    }

    @Get('/sort/:status')
    getFilteredTasks(@Param('status') status: string): Promise<Array<Task>> {
        return this.taskService.getAll(status);
    }

    @Delete('delete')
    deleteTask(@Body('id') id: number): Promise<any> {
        return this.taskService.delete(id);
    }

    @Post('create')
    cerateTask(@Body() body: CreateTaskDto): Promise<any> {
        return this.taskService.create(body);
    }

    @Put('update')
    updateTask(@Body() body: UpdateTaskDto): Promise<any> {
        return this.taskService.update(body);
    }

    @Patch('user')
    setTaskUser(@Body() body: SetTaskUserDto): Promise<any> {
        return this.taskService.setUser(body);
    }

    @Patch('status')
    setTaskStatus(@Body() body: SetTaskStatusDto): Promise<any> {
        return this.taskService.setStatus(body);
    }
}