import { z } from "zod";

export const wishlistItemZodSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  selectedVariants: z.record(z.string()).default({}),
  notifyWhenAvailable: z.boolean().optional().default(false),
});
