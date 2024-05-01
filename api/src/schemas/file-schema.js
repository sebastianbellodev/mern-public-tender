import { z } from 'zod';

const FILE_SCHEMA = z.object({
  id: z
    .string({
      required_error: 'ID is required',
    })
    .min(1, {
      message: 'ID must be at least 1 character long',
    })
    .max(15, {
      message: 'ID must be at most 15 characters long',
    }),
  budgetaryYear: z
    .string({
      required_error: 'Year is required',
    })
    .min(1, {
      message: 'Year must be at least 1 character long',
    })
    .max(4, {
      message: 'Year must be at most 4 characters long',
    }),
  date: z
    .date({
      required_error: 'Date is required',
    })
    .optional(),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, {
      message: 'Description must be at least 1 character long',
    })
    .max(255, {
      message: 'Description must be at most 255 characters long',
    }),
  addendum: z.string().optional(),
  hiring: z
    .string({
      required_error: 'Hiring is required',
    })
    .min(1, {
      message: 'Hiring must be at least 1 character long',
    })
    .max(24, {
      message: 'Hiring must be at most 24 characters long',
    }),
  law: z
    .string({
      required_error: 'Law is required',
    })
    .min(1, {
      message: 'Law must be at least 1 character long',
    })
    .max(24, {
      message: 'Law must be at most 24 characters long',
    }),
  assessment: z
    .string({
      required_error: 'Assessment is required',
    })
    .min(1, {
      message: 'Assessment must be at least 1 character long',
    })
    .max(24, {
      message: 'Assessment must be at most 24 characters long',
    }),
  advancePayment: z.boolean({
    required_error: 'Advance payment is required',
  }),
  porcentage: z.string().optional(),
  hiringProcessCategory: z
    .string({
      required_error: 'Hiring process is required',
    })
    .min(1, {
      message: 'Hiring process must be at least 1 character long',
    })
    .max(24, {
      message: 'Hiring process must be at most 24 characters long',
    }),
  internationalPolicy: z.array(
    z
      .string({
        required_error: 'International policy is required',
      })
      .min(1, {
        message: 'International policy must be at least 1 character long',
      })
      .max(24, {
        message: 'International policy must be at most 24 characters long',
      })
  ),
  deleted: z.boolean().default(false).optional(),
});

export default FILE_SCHEMA;
