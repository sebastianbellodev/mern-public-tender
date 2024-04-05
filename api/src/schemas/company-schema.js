import { z } from 'zod';

const COMPANY_SCHEMA = z.object({
  rfc: z
    .string({
      required_error: 'RFC is required',
    })
    .min(1, {
      message: 'RFC must be at least 1 character long',
    })
    .max(13, {
      message: 'RFC must be at most 13 characters long',
    }),
  name: z
    .string({
      required_error: 'Company name is required',
    })
    .min(1, {
      message: 'Company name must be at least 1 character long',
    })
    .max(50, {
      message: 'Company name must be at most 50 characters long',
    }),
  comercialSociety: z
    .string({
      required_error: 'Comercial society is required',
    })
    .min(1, {
      message: 'Comercial society must be at least 1 character long',
    })
    .max(12, {
      message: 'Comercial society must be at most 12 characters long',
    }),
  taxRegime: z
    .string({
      required_error: 'Tax regime is required',
    })
    .min(1, {
      message: 'Tax regime must be at least 1 character long',
    })
    .max(100, {
      message: 'Tax regime must be at most 100 characters long',
    }),
  deleted: z.boolean().default(false).optional(),
  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(1, {
      message: 'Address must be at least 1 character long',
    })
    .max(24, {
      message: 'Address must be at most 24 characters long',
    }),
});

export default COMPANY_SCHEMA;
