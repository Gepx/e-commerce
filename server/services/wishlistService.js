import Product from "../models/productModel.js";
import WishList from "../models/wishlistModel.js";

async function getWishList(userId) {
  const wishlist = await WishList.findOne({ user: userId }).populate(
    "items.product"
  );
  if (!wishlist) {
    return {
      user: userId,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  return wishlist;
}

async function addToWishlist(
  userId,
  { productId, selectedVariants = {}, notifyWhenAvailable = false }
) {
  const product = await Product.findById(productId);
  let wishlist = await WishList.findOne({ user: userId });

  if (!product) {
    throw { status: 404, message: "Product not found" };
  }

  if (!wishlist) {
    wishlist = new WishList({ user: userId, items: [] });
  }

  const existingItem = wishlist.items.find(
    (item) => item.product.toString() === productId
  );
  if (existingItem) {
    existingItem.selectedVariants = selectedVariants;
    existingItem.notifyWhenAvailable = notifyWhenAvailable;

    const updatedWishlist = await wishlist.save();
    await updatedWishlist.populate("items.product");
    return { wishlist: updatedWishlist, updated: true };
  }

  wishlist.items.push({
    product: productId,
    selectedVariants,
    notifyWhenAvailable,
  });

  const updatedWishlist = await wishlist.save();
  return updatedWishlist.populate("items.product");
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

export default { getWishList, addToWishlist, removeFromWishlist };
