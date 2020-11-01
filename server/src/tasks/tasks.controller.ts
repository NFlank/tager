import { Controller, Body, Get, HttpStatus, Post, Res, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Post()
    async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        const task = await this.taskService.create(createTaskDTO)
        return res.status(HttpStatus.OK).json({task, success: true})
    }

    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.findAll()
    }

    @Get(':id')
    async getTaskById(@Res() res, @Param('id') id) {
        const task = await this.taskService.getTaskById(id)
        if (!task) throw new NotFoundException('Task does not exist')
        return res.status(HttpStatus.OK).json({task, success: true})
    }

    @Put(':id')
    async update(@Res() res, @Param() param, @Body() createTaskDTO: CreateTaskDTO) {
        const task = await this.taskService.update(param.id, createTaskDTO)
        return res.status(HttpStatus.OK).json({task, success: true})
    }

    @Delete(':id')
    async removeTask(@Res() res, @Param('id') id) {
        const task = await this.taskService.deleteTask(id)
        if (!task) throw new NotFoundException('Task does not exist')
        return res.status(HttpStatus.OK).json({
            task,
            success: true,
            message: 'Task has been deleted'
        })
    }
}
