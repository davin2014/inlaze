import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { Post, PostSchema } from './entities/post.entity';

@Module({
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
    imports: [MongooseModule.forFeature([
            
        {
          name: Post.name,
          schema: PostSchema,
        },
        
      ])]
})
export class PostModule {}
