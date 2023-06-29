import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.findOne(email, password);
  }

  async login(user: LoginDto) {
    try {
      const validUser = await this.validateUser(user.email, user.password);

      if (!validUser) throw new UnauthorizedException('Invalid credentials');

      const payload = { email: user.email, sub: validUser.id };

      return {
        user: validUser,
        token: this.jwtService.sign(payload, { secret: 'SECRET_KEY' }),
      };
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    }
  }
}
