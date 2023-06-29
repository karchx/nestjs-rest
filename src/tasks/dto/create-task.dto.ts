import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/entities/task.entity';
import { UserEntity } from 'src/entities/user.entity';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'description is not empty',
  })
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty({
    message: 'user is not empty',
  })
  user: UserEntity;
}
