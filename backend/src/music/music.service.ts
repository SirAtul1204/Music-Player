import { Injectable } from '@nestjs/common';
import { MusicEntity } from 'src/entities/MusicEntity';
import { UserEntity } from 'src/entities/UserEntity';
import { bucket } from 'src/main';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  async createMusic(createDto: CreateMusicDto, userId: string) {
    const user = await UserEntity.findOne({
      where: {
        id: userId,
      },
    });

    return await MusicEntity.insert({ ...createDto, user });
  }

  async findAllMusic(userId: string) {
    const musics = await MusicEntity.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return musics;
  }

  async updateMusic(updateDto: UpdateMusicDto) {
    return await MusicEntity.update(updateDto.id, {
      name: updateDto.name,
      artistName: updateDto.artistName,
      description: updateDto.description,
      coverAlbum: updateDto.coverAlbum,
    });
  }

  async deleteMusics(ids: string[], userId: string) {
    let count = 0;
    ids.forEach(async (id) => {
      if (
        await MusicEntity.findOne({
          where: {
            id,
            user: {
              id: userId,
            },
          },
        })
      ) {
        await MusicEntity.delete(id);
        count++;
        bucket.file(`${userId}/${id}.mp3`).delete();
      }
    });

    return count;
  }

  async findMusicById(id: string) {
    const music = await MusicEntity.findOne({
      where: { id },
      relations: { user: true },
    });
    return music;
  }
}
