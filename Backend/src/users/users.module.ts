import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { User, UserSchema } from './entities/user.entity';



@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [
        MongooseModule.forFeature([
            
            {
              name: User.name,
              schema: UserSchema,
            },
            
          ])
    ],
})
export class UsersModule {}
