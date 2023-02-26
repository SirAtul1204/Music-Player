import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LoginUserSchema = z.object({
  email: z.string({ required_error: 'Email is Required' }),
  password: z
    .string({ required_error: 'Password is Required' })
    .min(4, 'Minimum 4 characters required for password'),
});

export class LoginUserDto extends createZodDto(LoginUserSchema) {}
