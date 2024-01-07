import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

import { enviroments } from './enviroments';
import { config } from './config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ ConfigModule.forRoot(
    {
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
    }
  ), 
   
   UsersModule,
   PostModule, 
   DatabaseModule, 
   AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
