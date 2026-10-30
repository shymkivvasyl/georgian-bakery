import { z } from 'zod';

// The shape of an order from the client.
// Zod checks types and required fields before the controller works with the data
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
        // Only for products with variants (tea, pastila...)
        variantId: z.number().int().optional(),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1),
  // Optional note from the client
  comment: z.string().optional(),
});
