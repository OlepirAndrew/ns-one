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

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User with that name already exists', HttpStatus.BAD_REQUEST)
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    const x = {...userDto, password: hashPassword}
    const user = await this.userService.createUser(x)

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id, email: user.email, roles: user.roles
    }

    return { token: this.jwtService.sign(payload) }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if(user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException( {message: 'Invalid email or password'} );
  }
}
