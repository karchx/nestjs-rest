import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async find(userId: number) {
    const userTask = await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (userTask.length > 0) {
      return userTask;
    }

    throw new HttpException('You do not have task', HttpStatus.NOT_FOUND);
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.taskRepository.create(createTaskDto);
      return await newTask.save();
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }
  }
}
