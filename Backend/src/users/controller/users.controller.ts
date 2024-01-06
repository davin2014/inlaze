import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';


@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService : UsersService) {}

    @Post()
    createUser(@Body() user: User) {
        return this.usersService.create(user);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        
        return this.usersService.getUser(id);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    

    @Put(':id')
        update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
            return this.usersService.update(id, payload);
    }
}
