import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs'
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    // getUsers(): Partial <{}> {
    //     const filePath = join(__dirname, '../..', 'moc', 'users.json')
    //     const jsonData = readFileSync(filePath,'utf-8');
    //
    //     return JSON.parse(jsonData);
    // }

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
