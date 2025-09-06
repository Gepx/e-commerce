import Product from "../models/productModel.js";
import {
  productZodSchema,
  productIdZodSchema,
  queryParamZodSchema,
} from "../schemas/productZodSchema.js";
import createQueryParams from "../utils/queryHelper.js";
import { z } from "zod";
import parseData from "../utils/productProcessor.js";

const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = queryParamZodSchema.parse(req.query);

    const offset = (page - 1) * limit;

    const { page: _p, limit: _l, ...filters } = req.query;
    const conditions = createQueryParams(filters, "product");
    conditions.deletedAt = null;

    const [products, total] = await Promise.all([
      Product.find(conditions)
        .skip(offset)
        .limit(limit)
        .sort({ updatedAt: -1 }),
      Product.countDocuments(conditions),
    ]);

    res.status(200).json({
      message: "Product retrieved successfully",
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
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
    let data = await parseData(req.body, req.files);

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
    let data = await parseData(req.body, req.files);

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

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
