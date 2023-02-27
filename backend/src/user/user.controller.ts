import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response, Request, response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(createDto.email);
    if (user)
      throw new HttpException(
        {
          message: 'User already Exists',
          isSuccess: false,
        },
        HttpStatus.CONFLICT,
      );

    const res = await this.userService.createUser(createDto);
    return { message: 'User registered successfully', isSuccess: true };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user)
      throw new HttpException(
        {
          message: 'User not found',
          isSuccess: false,
        },
        HttpStatus.NOT_FOUND,
      );
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching)
      throw new HttpException(
        {
          message: "Email & Password don't match",
          isSuccess: false,
        },
        HttpStatus.FORBIDDEN,
      );

    const token = jwt.sign({ userId: user.id }, process.env.SECRET);
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
    });

    return {
      message: 'Logged in Successfully',
      isSuccess: true,
    };
  }

  @Post('verify')
  async verifyToken(@Req() request: Request) {
    const token = request.cookies['token'];
    if (!token)
      throw new HttpException(
        {
          message: 'Token is Required',
          isSuccess: false,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const data = jwt.verify(token, process.env.SECRET);
    if (!data)
      throw new HttpException(
        {
          message: 'Wrong token',
          isSuccess: false,
        },
        HttpStatus.UNAUTHORIZED,
      );
    return { message: 'Verified', isSuccess: true };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
    });

    return { message: 'Logged out successfully', isSuccess: true };
  }
}
