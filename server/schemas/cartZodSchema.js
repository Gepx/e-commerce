import { z } from "zod";
import mongoose from "mongoose";

const cartItemZodSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid product ID",
  }),
  quantity: z.coerce.number().min(1),
  selectedVariants: z.record(z.string()).default({}),
});

const removeCartItemZodSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid product ID",
  }),
  selectedVariants: z.record(z.string()).default({}),
});

export { cartItemZodSchema, removeCartItemZodSchema };
