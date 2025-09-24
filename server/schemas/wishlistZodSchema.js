import mongoose from "mongoose";
import { z } from "zod";

const baseWishlistItemZodSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  selectedVariants: z.record(z.string()).default({}),
  notifyWhenAvailable: z.boolean().optional().default(false),
});

const wishlistItemZodSchema = baseWishlistItemZodSchema.extend({
  productId: baseWishlistItemZodSchema.shape.productId.refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid MongoDB ObjectId for product" }
  ),
});

export { wishlistItemZodSchema };
