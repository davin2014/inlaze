import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('post')
@Controller('post')
export class PostController {}
