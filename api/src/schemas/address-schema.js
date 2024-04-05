import { z } from 'zod';

const ADDRESS_SCHEMA = z.object({
  street: z
    .string({
      required_error: 'Street is required',
    })
    .min(1, {
      message: 'Street must be at least 1 character long',
    })
    .max(50, {
      message: 'Street must be at most 50 characters long',
    }),
  exteriorNumber: z
    .string({
      required_error: 'Exterior number is required',
    })
    .min(1, {
      message: 'Exterior number must be at least 1 character long',
    })
    .max(10, {
      message: 'Exterior number must be at most 10 characters long',
    }),
  interiorNumber: z
    .string()
    .min(1, {
      message: 'Interior number must be at least 1 character long',
    })
    .max(10, {
      message: 'Interior number must be at most 10 characters long',
    })
    .optional(),
  neighborhood: z
    .string({
      required_error: 'Neighborhood is required',
    })
    .min(1, {
      message: 'Neighborhood must be at least 1 character long',
    })
    .max(50, {
      message: 'Neighborhood must be at most 50 characters long',
    }),
  city: z
    .string({
      required_error: 'City is required',
    })
    .min(1, {
      message: 'City must be at least 1 character long',
    })
    .max(50, {
      message: 'City must be at most 50 characters long',
    }),
  state: z
    .string({
      required_error: 'State is required',
    })
    .min(1, {
      message: 'State must be at least 1 character long',
    })
    .max(50, {
      message: 'State must be at most 50 characters long',
    }),
  country: z
    .string({
      required_error: 'Country is required',
    })
    .min(1, {
      message: 'Country must be at least 1 character long',
    })
    .max(50, {
      message: 'Country must be at most 50 characters long',
    }),
  postalCode: z
    .string({
      required_error: 'Postal code is required',
    })
    .min(1, {
      message: 'Postal code must be at least 1 character long',
    })
    .max(6, {
      message: 'Postal code must be at most 6 characters long',
    }),
  deleted: z.boolean().default(false).optional(),
});

export default ADDRESS_SCHEMA;
