import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { UsersService } from 'src/users/service/users.service';




@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(email: string, password: string): Promise<UserWithoutPassword> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const { password, ...rta } = user.toJSON();
            return rta;
          }
        }
        return null;
      }
    
     loginToken(user: UserWithoutPassword): { access_token: string, user: UserWithoutPassword }{
        const payload:PayloadToken = {  sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
          user: user
        };
      }
}
