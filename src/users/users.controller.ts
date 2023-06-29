import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
