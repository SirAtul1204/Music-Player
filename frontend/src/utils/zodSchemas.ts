import { z } from "zod";

export const emailSchema = z.string().email("Invalid Email");
export const passwordSchema = z
  .string()
  .min(4, "Minimum 4 characters required");

export const LoginResponseSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});
