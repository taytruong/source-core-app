import z from 'zod';

import { CouponType } from '@/src/shared/constants';

export const couponCreateSchema = z.object({
  title: z
    .string({ message: 'title is required' })
    .min(3, 'Title must be at least 3 characters long'),
  code: z
    .string({ message: 'Code is required' })
    .min(3, 'Code must be at least 3 characters long')
    .max(10, 'Code must not exceed 10 characters'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.enum([CouponType.PERCENT, CouponType.AMOUNT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});
