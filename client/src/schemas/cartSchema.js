import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string().min(1, { message: 'Product ID is required' }),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  selectedVariants: z.record(z.string()).default({})
});

export const removeCartItemSchema = z.object({
  productId: z.string().min(1, { message: 'Product ID is required' }),
  selectedVariants: z.record(z.string()).default({})
});

// Not Used
