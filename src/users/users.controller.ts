import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../shared/jwt-auth.guard.ts.guard';

export type TUsers = User[]
@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // @Get('')
    // getUsers() {
    //     return this.usersService.getUsers();
    // }
    @ApiOperation({ summary: 'Create users' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        console.log('userDto', userDto);
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }
}
