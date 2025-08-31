const Product = require("../models/productModel");
const WishList = require("../models/wishlistModel");

async function getWishList(userId) {
  const wishlist = await WishList.findOne({ user: userId });
  if (!wishlist) {
    throw { status: 404, message: "Wishlist not found" };
  }
  return wishlist;
}

async function addToWishlist(userId, { productId, selectedVariants = {} }) {
  const product = await Product.findById(productId);
  const wishlist = await WishList.findOne({ user: userId });

  if (!product) {
    throw { status: 404, message: "Product not found" };
  }

  const existingItem = wishlist.items.find(
    (item) => item.product.toString() === productId
  );
  if (existingItem) {
    throw { status: 400, message: "Product already in wishlist" };
  }

  wishlist.items.push({ product: productId, selectedVariants });

  const updatedWishlist = await wishlist.save();
  return updatedWishlist;
}

async function removeFromWishlist(userId, { productId }) {
  const wishlist = await WishList.findOne({ user: userId });
  if (!wishlist) {
    throw { status: 404, message: "Wishlist not found" };
  }

  const existingItem = wishlist.items.find(
    (item) => item.product.toString() === productId
  );
  if (!existingItem) {
    throw { status: 404, message: "Product not found in wishlist" };
  }

  wishlist.items.splice(wishlist.items.indexOf(existingItem), 1);
  const updatedWishlist = await wishlist.save();
  return updatedWishlist;
}

module.exports = { getWishList, addToWishlist, removeFromWishlist };
