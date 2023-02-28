import {
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { MusicEntity } from 'src/entities/MusicEntity';
import { UserEntity } from 'src/entities/UserEntity';
import { AuthGuard } from 'src/guards/auth.guard';
import { bucket } from 'src/main';
import { RequestWithUser } from 'src/utils/interfaces';
import { CreateMusicDto } from './dto/create-music.dto';
import { DeleteMusicDto } from './dto/delete-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
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

  @Get('play/:id')
  @UseGuards(AuthGuard)
  async play(@Req() request: RequestWithUser, @Param('id') id: string) {
    const { userId } = request.user;
    const url = await bucket.file(`${userId}/${id}.mp3`).getSignedUrl({
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    return { message: 'Playing ...', isSuccess: true, url };
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @Body() updateDto: UpdateMusicDto,
    @Req() request: RequestWithUser,
  ) {
    const music = await this.musicService.findMusicById(updateDto.id);
    if (!music)
      throw new HttpException(
        {
          message: 'No such music file',
          isSuccess: false,
        },
        HttpStatus.NOT_FOUND,
      );

    if (music.user.id !== request.user.userId)
      throw new HttpException(
        { message: 'You are not authorized', isSuccess: false },
        HttpStatus.FORBIDDEN,
      );

    await this.musicService.updateMusic(updateDto);
    return { message: 'Updated', isSuccess: true };
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteMusic(
    @Req() request: RequestWithUser,
    @Body() deleteDto: DeleteMusicDto,
  ) {
    const { userId } = request.user;
    const count = await this.musicService.deleteMusics(deleteDto.ids, userId);
    const remaining = await this.musicService.findAllMusic(userId);
    return { message: 'Deleted', isSuccess: true, count, musics: remaining };
  }
}
