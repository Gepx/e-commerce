import { z } from "zod";
import { userIdParamZodSchema } from "../schemas/userZodSchema.js";
import { wishlistItemZodSchema } from "../schemas/wishlistZodSchema.js";
import wishlistService from "../services/wishlistService.js";
import cacheService from "../services/cacheService.js";

const getUserWishList = async (req, res) => {
  try {
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });

    const cacheKey = `getWishlist:${userId}`;
    const cachedWishlist = await cacheService.get(cacheKey);

    if (cachedWishlist) {
      return res.status(200).json(cachedWishlist);
    }

    const wishlist = await wishlistService.getWishList(userId);

    const response = {
      message: "Wishlist retrieved successfully",
      wishlist,
    };

    await cacheService.set(cacheKey, response, 600);
    res.status(200).json(response);
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
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });

    const {
      productId: productId,
      selectedVariants = {},
      notifyWhenAvailable = false,
    } = await wishlistItemZodSchema.parseAsync(req.body);

    const addedWishlist = await wishlistService.addToWishlist(userId, {
      productId: productId,
      selectedVariants,
      notifyWhenAvailable,
    });

    const message = addedWishlist.updated
      ? "Item successfully updated in wishlist"
      : "Item successfully added to wishlist";

    await cacheService.del(`wishlist:${userId}`);
    // await cacheService.clearPattern("wishlist:*");

    res.status(200).json({
      message,
      wishlist: addedWishlist.wishlist,
      updated: addedWishlist.updated,
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
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });
    const { productId: productId, selectedVariants = {} } =
      await wishlistItemZodSchema.parseAsync(req.body);
    const wishlist = await wishlistService.removeFromWishlist(userId, {
      productId,
      selectedVariants,
    });

    // await Promise.all([
    cacheService.del(`wishlist:${userId}`),
      // cacheService.clearPattern("wishlist:*"),
      // ]);

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

export default {
  getUserWishList,
  addItemToWishlist,
  removeItemFromWishlist,
};
