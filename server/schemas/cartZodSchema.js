import mongoose from "mongoose";
import { z } from "zod";

const baseCartItemZodSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  quantity: z.coerce.number().min(1),
  selectedVariants: z.record(z.string()).default({}),
});

const cartItemZodSchema = baseCartItemZodSchema.extend({
  productId: baseCartItemZodSchema.shape.productId.refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid MongoDB ObjectId for product" }
  ),
});

const baseRemoveCartItemZodSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  selectedVariants: z.record(z.string()).default({}),
});

const removeCartItemZodSchema = baseRemoveCartItemZodSchema.extend({
  productId: baseRemoveCartItemZodSchema.shape.productId.refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid MongoDB ObjectId for product" }
  ),
});

export { cartItemZodSchema, removeCartItemZodSchema };
