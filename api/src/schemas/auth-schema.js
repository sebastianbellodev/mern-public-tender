import { z } from 'zod';

const AUTH_SCHEMA = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(2, {
      message: 'Username must be at least 2 character long',
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
    .min(15, {
      message: 'Email must be at least 15 character long',
    })
    .max(30, {
      message: 'Email must be at most 30 characters long',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, {
      message: 'Password must be at least 8 character long',
    })
    .max(30, {
      message: 'Password must be at most 30 characters long',
    }),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, {
      message: 'Name must be at least 2 character long',
    })
    .max(25, {
      message: 'Name must be at most 25 characters long',
    }),
  lastname: z
    .string({
      required_error: 'Lastname is required',
    })
    .min(2, {
      message: 'Lastname must be at least 2 character long',
    })
    .max(30, {
      message: 'Lastname must be at most 30 characters long',
    }),
  deleted: z.boolean().default(false).optional(),
});

export default AUTH_SCHEMA;
