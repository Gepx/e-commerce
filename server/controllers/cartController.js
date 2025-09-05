const {
  cartItemZodSchema,
  removeCartItemZodSchema,
} = require("../schemas/cartZodSchema");
const { userIdParamZodSchema } = require("../schemas/userZodSchema");
const { z } = require("zod");
const cartService = require("../services/cartService");

const getUserCart = async (req, res) => {
  try {
    const { id: userId } = userIdParamZodSchema.parse({ id: req.user.id });
    const cart = await cartService.getCartItems(userId);
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
      productId: productId,
      quantity,
      selectedVariants = {},
    } = await cartItemZodSchema.parseAsync(req.body);

    const cart = await cartService.addItem(userId, {
      productId: productId,
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
  updateCartItem,
};
