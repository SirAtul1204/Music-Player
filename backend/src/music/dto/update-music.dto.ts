import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UpdateMusicSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  coverAlbum: z.string(),
  artistName: z.string(),
});

export class UpdateMusicDto extends createZodDto(UpdateMusicSchema) {}
