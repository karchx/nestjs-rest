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
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
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

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: number,
    @Req() req: ExtendedRequest,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const payloadTask: UpdateTaskDto = {
      ...updateTaskDto,
      user: req.user,
    };
    return this.tasksService.update(payloadTask, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number, @Req() req: ExtendedRequest) {
    return this.tasksService.delete(req.user, id);
  }
}
