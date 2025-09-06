import { z } from "zod";
import mongoose from "mongoose";

const wishlistItemZodSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  selectedVariants: z.record(z.string()).default({}),
  notifyWhenAvailable: z.boolean().optional().default(false),
});

export { wishlistItemZodSchema };
