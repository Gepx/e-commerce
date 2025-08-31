const cartItemZodSchema = require("../schemas/cartZodSchema");
const { userIdParamZodSchema } = require("../schemas/userZodSchema");
const { z } = require("zod");
const cartService = require("../services/cartService");

const getUserCart = async (req, res) => {
  try {
    const { id: userId } = userIdParamZodSchema.parse({ id: req.user.id });
    const cart = await cartService.getOrCreateCart(userId);
    return res.status(200).json({
      message: "Cart retrieved successfully",
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

const addItemToCart = async (req, res) => {
  try {
    const { id: userId } = userIdParamZodSchema.parse({ id: req.user.id });
    const {
      product: productId,
      quantity,
      selectedVariants = {},
    } = await cartItemZodSchema.parseAsync(req.body);

    const cart = await cartService.addItem(userId, {
      productId,
      quantity,
      selectedVariants,
    });

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

const removeCartItem = async (req, res) => {
  try {
    const userId = await userIdParamZodSchema.parseAsync({ id: req.user.id });
    const { product: productId, selectedVariants = {} } =
      await cartItemZodSchema.parseAsync(req.body);

    const cart = await cartService.removeItem(userId, {
      productId,
      selectedVariants,
    });

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

module.exports = {
  getUserCart,
  addItemToCart,
  removeCartItem,
};
