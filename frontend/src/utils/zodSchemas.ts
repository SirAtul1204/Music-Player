import { z } from "zod";

export const emailSchema = z.string().email("Invalid Email");
export const passwordSchema = z
  .string()
  .min(4, "Minimum 4 characters required");

export const nameSchema = z.string().min(1);

export const GetMusicResponseSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
  musics: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      coverAlbum: z.string(),
      artistName: z.string(),
    })
  ),
});

export const DeleteMusicResponseSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
  musics: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      coverAlbum: z.string(),
      artistName: z.string(),
    })
  ),
});

export const GeneralResponseSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});
