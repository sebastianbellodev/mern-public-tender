import { z } from 'zod';

const AUTH_SCHEMA = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(1, {
      message: 'Username must be at least 1 character long',
    })
    .max(15, {
      message: 'Username must be at most 15 characters long',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email format',
    })
    .min(1, {
      message: 'Email must be at least 1 character long',
    })
    .max(30, {
      message: 'Email must be at most 30 characters long',
    }),
  password: z
    .string({})
    .min(1, {
      message: 'Password must be at least 1 character long',
    })
    .max(15, {
      message: 'Password must be at most 15 characters long',
    }),
  deleted: z.boolean().default(false).optional(),
});

export default AUTH_SCHEMA;
