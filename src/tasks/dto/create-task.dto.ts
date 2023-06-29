import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../../entities/task.entity';
import { UserEntity } from '../../entities/user.entity';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'description is not empty',
  })
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
 
  user: UserEntity;
}

export class UpdateTaskDto extends CreateTaskDto {}
