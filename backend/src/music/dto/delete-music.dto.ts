import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const DeleteMusicSchema = z.object({
  ids: z.array(z.string()),
});

export class DeleteMusicDto extends createZodDto(DeleteMusicSchema) {}
