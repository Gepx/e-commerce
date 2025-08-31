const { z } = require("zod");
const { userIdParamZodSchema } = require("../schemas/userZodSchema");
const wishlistItemZodSchema = require("../schemas/wishlistZodSchema");
const wishlistService = require("../services/wishlistService");

const getUserWishList = async (req, res) => {
  try {
    const userId = await userIdParamZodSchema.parseAsync({ id: req.user.id });
    const wishlist = await wishlistService.getWishList(userId);
    res.status(200).json({
      message: "Wishlist retrieved successfully",
      wishlist,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const addItemToWishlist = async (req, res) => {
  try {
    const userId = await userIdParamZodSchema.parseAsync({ id: req.user.id });
    const {
      product: productId,
      selectedVariants = {},
      notifyWhenAvailable = false,
    } = await wishlistItemZodSchema.parseAsync(req.body);
    const wishlist = await wishlistService.addToWishlist(userId, {
      productId,
      selectedVariants,
      notifyWhenAvailable,
    });
    res.status(200).json({
      message: "Item successfully added to wishlist",
      wishlist,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const removeItemFromWishlist = async (req, res) => {
  try {
    const userId = await userIdParamZodSchema.parseAsync({ id: req.user.id });
    const { product: productId, selectedVariants = {} } =
      await wishlistItemZodSchema.parseAsync(req.body);
    const wishlist = await wishlistService.removeFromWishlist(userId, {
      productId,
      selectedVariants,
    });
    res.status(200).json({
      message: "Item successfully removed from wishlist",
      wishlist,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

module.exports = {
  getUserWishList,
  addItemToWishlist,
  removeItemFromWishlist,
};
