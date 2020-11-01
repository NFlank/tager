import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Task } from './interfaces/task.interface'
import { CreateTaskDTO } from './dto/create-task.dto'
import { throws } from 'assert'

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>){}

    async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const newTask = new this.taskModel(createTaskDTO)
        return await newTask.save()
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.taskModel.find().exec()
        return tasks
    }

    async getTaskById(id: string): Promise<Task> {
        const task = this.taskModel.findById(id).exec()
        return await task
    }

    async update(id: string, createTaskDTO: CreateTaskDTO): Promise<Task> {
        return await this.taskModel.findOneAndUpdate({_id: id}, createTaskDTO)
    }

    async deleteTask(id: string): Promise<Task> {
        return await this.taskModel.findOneAndDelete({_id: id})
    }
}
