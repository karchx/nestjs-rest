import { 
    Controller, 
    Post,  
    UsePipes,
    UseGuards,
    ValidationPipe,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @UseGuards(LocalGuard)
    @Post('/login')
    async login(@Req() req: Request) {
        console.log(req);
        return { message: "working.." };
        // return await this.authService.login(req.user)
    }
}
