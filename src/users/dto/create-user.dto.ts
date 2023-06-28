import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20) 
  password: string;
}