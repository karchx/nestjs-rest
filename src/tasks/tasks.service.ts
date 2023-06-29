import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { UserEntity } from '../entities/user.entity';

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

  async update(updateTaskDto: UpdateTaskDto, id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        user: {
          id: updateTaskDto.user.id,
        },
        id,
      },
    });

    if (!task) {
      throw new HttpException('you are not the owner', HttpStatus.UNAUTHORIZED);
    }
    return this.taskRepository.save({
      ...task,
      ...updateTaskDto,
    });
  }

  async delete(user: UserEntity, id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        id,
      },
    });

    if (!task) {
      throw new HttpException('you are not the owner', HttpStatus.UNAUTHORIZED);
    }
    return await this.taskRepository.remove(task);
  }
}
