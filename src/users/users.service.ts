import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new UserEntity();
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = hashPassword;
      return this.userRepository.save(user);
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }
  }

  async findOne(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }
}
