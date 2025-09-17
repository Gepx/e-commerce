import {
  cartItemZodSchema,
  removeCartItemZodSchema,
} from "../schemas/cartZodSchema.js";
import { userIdParamZodSchema } from "../schemas/userZodSchema.js";
import { z } from "zod";
import cartService from "../services/cartService.js";
import cacheService from "../services/cacheService.js";

const getUserCart = async (req, res) => {
  try {
    const { id: userId } = userIdParamZodSchema.parse({ id: req.user.id });

    const cacheKey = `cart:${userId}`;

    const cachedCart = await cacheService.get(cacheKey);

    if (cachedCart) {
      return res.status(200).json(cachedCart);
    }

    const cart = await cartService.getCartItems(userId);

    const response = {
      message: "Cart retrieved successfully",
      cart,
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

const addItemToCart = async (req, res) => {
  try {
    const { id: userId } = userIdParamZodSchema.parse({ id: req.user.id });

    const {
      productId: productId,
      quantity,
      selectedVariants = {},
    } = await cartItemZodSchema.parseAsync(req.body);

    const cart = await cartService.addItem(userId, {
      productId: productId,
      quantity,
      selectedVariants,
    });

    await cacheService.delete(`cart:${userId}`);

    return res.status(200).json({
      message: "Item successfully added to cart",
      cart,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id: userId } = userIdParamZodSchema.parse({ id: req.user.id });
    const {
      productId,
      quantity,
      selectedVariants = {},
    } = await cartItemZodSchema.parseAsync(req.body);
    const cart = await cartService.updateItem(userId, {
      productId,
      quantity,
      selectedVariants,
    });

    await cacheService.delete(`cart:${userId}`);

    return res
      .status(200)
      .json({ message: "Item successfully updated in cart", cart });
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

const removeCartItem = async (req, res) => {
  try {
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });

    const { productId, selectedVariants = {} } =
      await removeCartItemZodSchema.parseAsync(req.body);

    const cart = await cartService.removeItem(userId, {
      productId: productId,
      selectedVariants,
    });

    await cacheService.delete(`cart:${userId}`);

    res.status(200).json({
      message: "Item successfully removed from cart",
      cart,
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
  getUserCart,
  addItemToCart,
  removeCartItem,
  updateCartItem,
};
