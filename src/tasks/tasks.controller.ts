import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ExtendedRequest } from 'src/interfaces/app.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  get(@Req() req: ExtendedRequest) {
    return this.tasksService.find(req.user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  create(@Req() req: ExtendedRequest, @Body() createTaskDto: CreateTaskDto) {
    const payloadTask: CreateTaskDto = {
      ...createTaskDto,
      user: req.user,
    };
    return this.tasksService.create(payloadTask);
  }
}
