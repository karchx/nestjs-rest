import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString()
  password: string;

  id?: number;
}