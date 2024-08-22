import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs'
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
    // getUsers(): Partial <{}> {
    //     const filePath = join(__dirname, '../..', 'moc', 'users.json')
    //     const jsonData = readFileSync(filePath,'utf-8');
    //
    //     return JSON.parse(jsonData);
    // }

    constructor(
      @InjectModel(User) private userRepository: typeof User,
      private rolesService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER')

        await user.$set('roles',[String(role.id)])

        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }
}
