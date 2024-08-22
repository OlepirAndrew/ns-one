import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'a user with that name already exists',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser(
      {...userDto, password: hashPassword}
    )
  }

  async generateToken(user: User) {
    const payload = {
      id: user.id, email: user.email, roles: user.roles
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
