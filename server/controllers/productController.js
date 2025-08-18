const Product = require("../models/productModel");
const {
  productZodSchema,
  productIdZodSchema,
} = require("../schemas/productZodSchema");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ deletedAt: null });
    res.status(200).json({
      message: "Product retrieved successfully",
      products,
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

const getProductById = async (req, res) => {
  try {
    const { id } = productIdZodSchema.parse(req.params);
    const product = await Product.findById(id).where({ deletedAt: null });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      product,
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

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const productValidate = await productZodSchema.parseAsync(data);
    const newProduct = new Product(productValidate);

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
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

const updateProduct = async (req, res) => {
  try {
    const { id } = productIdZodSchema.parse(req.params);
    const data = req.body;

    const productValidate = await productZodSchema.parseAsync(data);
    const updateProductData = await Product.findByIdAndUpdate(
      id,
      productValidate,
      { new: true }
    );
    if (!updateProductData) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updateProductData,
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

const deleteProduct = async (req, res) => {
  try {
    const { id } = productIdZodSchema.parse(req.params);

    const product = await Product.findByIdAndUpdate(
      id,
      {
        deletedAt: Date.now(),
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product,
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
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
