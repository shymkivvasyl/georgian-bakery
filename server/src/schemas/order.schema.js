import { z } from 'zod';

export const orderSchema = z.object({
  locationId: z.number().int(),
  customer: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
  }),
  items: z
    .array(
      z.object({
        productId: z.number().int(),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1),
  comment: z.string().optional(),
});
