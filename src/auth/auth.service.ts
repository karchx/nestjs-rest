import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        return await this.usersService.findOne(email, password);
    }

    async login(user: LoginDto) {
        try {
            const payload = { email: user.email, sub: user.id };

            return {
                ...payload,
                token: this.jwtService.sign(payload),
            }
        } catch(error) {
            throw new Error(`Error logging in ${error} user ${error.message}`) ;
        }
    }
}
