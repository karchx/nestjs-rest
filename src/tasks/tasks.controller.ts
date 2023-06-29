import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  //@UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  create(@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
    console.log(req.user);
    return this.tasksService.create(createTaskDto);
  }
}
