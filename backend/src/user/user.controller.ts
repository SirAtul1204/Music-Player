import { Controller, Post, Body, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(createDto.email);
    if (user)
      throw new HttpException('User already Exists', HttpStatus.CONFLICT);

    const res = await this.userService.createUser(createDto);
    return { message: 'User registered successfully', isSuccess: true };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching)
      throw new HttpException(
        "Email & Password don't match",
        HttpStatus.FORBIDDEN,
      );

    const token = jwt.sign({ userId: user.id }, process.env.SECRET);
    response.cookie('token', token, {
      httpOnly: true,
    });

    return {
      message: 'Logged in Successfully',
      isSuccess: true,
    };
  }
}
