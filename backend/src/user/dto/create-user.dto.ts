import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }),
  email: z
    .string({ required_error: 'Email is Required' })
    .email('Enter valid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, 'Minimum 4 characters required for password'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
