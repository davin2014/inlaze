import { Body, Controller,  Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


import { AuthService } from '../service/auth.service';
import { User } from 'src/users/entities/user.entity';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({ 
      schema: {
        type: 'object', 
        properties: { 
          email: { type: 'string' }, 
          password: { type: 'string' } 
        } 
      } 
    })
    async login(@Body() loginDto: { email: string, password: string }) {
      const user:UserWithoutPassword =  await this.authService.validateUser(loginDto.email, loginDto.password);
       return this.authService.loginToken(user);
    }
}
