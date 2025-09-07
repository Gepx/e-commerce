import mongoose from "mongoose";
import { wishlistItemZodSchema as sharedWishlistItemSchema } from "../../shared/src/schemas/wishlist.js";

const wishlistItemZodSchema = sharedWishlistItemSchema.extend({
  productId: sharedWishlistItemSchema.shape.productId.refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid MongoDB ObjectId for product" }
  ),
});

export { wishlistItemZodSchema };
