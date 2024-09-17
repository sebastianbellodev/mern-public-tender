import { z } from 'zod';

const FILE_SCHEMA = z.object({
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, {
      message: 'Description must be at least 16 character long',
    })
    .max(255, {
      message: 'Description must be at most 255 characters long',
    }),
  reference: z
    .string({
      required_error: 'Reference is required',
    })
    .min(16, {
      message: 'Reference must be at least 16 character long',
    })
    .max(20, {
      message: 'Reference must be at most 20 characters long',
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
  addendum: z
    .string()
    .min(1, {
      message: 'Addendum must be at least 1 character long',
    })
    .max(255, {
      message: 'Addendum must be at most 255 characters long',
    })
    .optional(),
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
  advancePayment: z
    .boolean({
      required_error: 'Advance payment is required',
    })
    .default(false)
    .optional(),
  percentage: z
    .string()
    .min(1, {
      message: 'Percentage must be at least 1 character long',
    })
    .max(2, {
      message: 'Percentage must be at most 2 characters long',
    })
    .optional(),
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
