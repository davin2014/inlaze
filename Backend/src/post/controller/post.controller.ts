import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from '../service/post.service';
import { PostUser } from '../entities/post.entity';



@ApiTags('post')
@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService) {}

    @Get('/posts')
    getPosts() {
        return this.postService.getPosts();
    }

    @Get('/post/:id')
    getPost(id: string) {
        return this.postService.getPost(id);
    }

    @Post()
    createPost(@Body() data:PostUser) {
        return this.postService.createPost(data);
    }
}
