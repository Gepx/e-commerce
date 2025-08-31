const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  selectedVariants: {
    type: Map,
    of: String,
    default: {},
  },
  notifyWhenAvailable: {
    type: Boolean,
    default: false,
  },
});

const WishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [wishlistItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

WishListSchema.index({ user: 1 });

module.exports = mongoose.model("WishList", WishListSchema);
