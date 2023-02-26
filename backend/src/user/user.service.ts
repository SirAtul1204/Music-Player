import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/UserEntity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UserService {
  async createUser({ email, name, password }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await UserEntity.insert({
      name,
      email,
      password: hashedPassword,
      musics: [],
    });
  }

  async findUserByEmail(email: string) {
    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
