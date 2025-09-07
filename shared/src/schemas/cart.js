import { z } from "zod";

export const cartItemZodSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  quantity: z.coerce.number().min(1),
  selectedVariants: z.record(z.string()).default({}),
});

export const removeCartItemZodSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  selectedVariants: z.record(z.string()).default({}),
});
