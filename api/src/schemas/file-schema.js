import { z } from 'zod';

const FILE_SCHEMA = z.object({
  id: z
    .string({
      required_error: 'ID is required',
    })
    .min(1, {
      message: 'ID must be at least 1 character long',
    })
    .max(10, {
      message: 'ID must be at most 10 characters long',
    }),
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
  reference: z
    .string({
      required_error: 'Reference is required',
    })
    .min(1, {
      message: 'Reference must be at least 1 character long',
    })
    .max(17, {
      message: 'Reference must be at most 17 characters long',
    }),
  operator: z
    .string({
      required_error: 'Operator is required',
    })
    .min(1, {
      message: 'Operator must be at least 1 character long',
    })
    .max(24, {
      message: 'Operator must be at most 24 characters long',
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
  assessmentMetric: z
    .string({
      required_error: 'Assessment metric is required',
    })
    .min(1, {
      message: 'Assessment metric must be at least 1 character long',
    })
    .max(24, {
      message: 'Assessment metric must be at most 24 characters long',
    }),
  advancePayment: z.boolean({
    required_error: 'Advance payment is required',
  }),
  porcentage: z.string().optional(),
  internationalPolicies: z.array(
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
