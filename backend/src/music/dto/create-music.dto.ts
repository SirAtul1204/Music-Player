import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateMusicSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string({ required_error: 'Description is required' }),
  coverAlbum: z.string({ required_error: 'Cover Album is Required' }),
  artistName: z.string({ required_error: 'Artist Name is Required' }),
});

export class CreateMusicDto extends createZodDto(CreateMusicSchema) {}
