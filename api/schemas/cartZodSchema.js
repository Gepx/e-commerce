import mongoose from "mongoose";
import {
  cartItemZodSchema as sharedCartItemSchema,
  removeCartItemZodSchema as sharedRemoveCartItemSchema,
} from "../../shared/src/schemas/cart.js";

const cartItemZodSchema = sharedCartItemSchema.extend({
  productId: sharedCartItemSchema.shape.productId.refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid MongoDB ObjectId for product" }
  ),
});

const removeCartItemZodSchema = sharedRemoveCartItemSchema.extend({
  productId: sharedRemoveCartItemSchema.shape.productId.refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid MongoDB ObjectId for product" }
  ),
});

export { cartItemZodSchema, removeCartItemZodSchema };
