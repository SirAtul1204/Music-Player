import {
  Get,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { MusicEntity } from 'src/entities/MusicEntity';
import { AuthGuard } from 'src/guards/auth.guard';
import { bucket } from 'src/main';
import { RequestWithUser } from 'src/utils/interfaces';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addMusic(
    @Body() createDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: RequestWithUser,
  ) {
    const { userId } = request.user;
    const music = await this.musicService.createMusic(createDto, userId);

    await bucket
      .file(`${userId}/${music.generatedMaps[0].id}.mp3`)
      .save(file.buffer);
    return { message: 'Saved successfully', isSuccess: true };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Req() request: RequestWithUser) {
    const { userId } = request.user;
    const musics = await this.musicService.findAllMusic(userId);
    return { message: 'All musics fetched', isSuccess: true, musics };
  }
}
