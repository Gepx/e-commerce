import Product from "../models/productModel.js";
import {
  productZodSchema,
  productIdZodSchema,
  queryParamZodSchema,
} from "../schemas/productZodSchema.js";
import createQueryParams from "../utils/queryHelper.js";
import { z } from "zod";
import { parseBodyFields, uploadNewImages } from "../utils/productProcessor.js";
import cacheService from "../services/cacheService.js";

const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = queryParamZodSchema.parse(req.query);

    const cacheKey = `products:${JSON.stringify(req.query)}`;

    const cachedProducts = await cacheService.get(cacheKey);
    if (cachedProducts) {
      return res.status(200).json(cachedProducts);
    }

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

    const response = {
      message: "Product retrieved successfully",
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
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

const getProductById = async (req, res) => {
  try {
    const { id } = productIdZodSchema.parse(req.params);

    const cacheKey = `product:${id}`;
    const cachedProduct = await cacheService.get(cacheKey);

    if (cachedProduct) {
      return res.status(200).json(cachedProduct);
    }

    const product = await Product.findById(id).where({ deletedAt: null });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const response = {
      message: "Product retrieved successfully",
      product,
    };

    await cacheService.set(cacheKey, response, 1800);

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

const createProduct = async (req, res) => {
  try {
    const data = await parseBodyFields(req.body);
    const newImageUrls = await uploadNewImages(req.files);
    data.productImages = newImageUrls;

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

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const parsedBody = await parseBodyFields(req.body);

    const newImageUrls = await uploadNewImages(req.files);

    const removedImages = parsedBody.removedImages || [];

    const updatedImages = product.productImages
      .filter((url) => !removedImages.includes(url))
      .concat(newImageUrls);

    const dataToValidate = {
      ...parsedBody,
      productImages: updatedImages,
    };

    const productValidate = await productZodSchema.parseAsync(dataToValidate);
    const updateProductData = await Product.findByIdAndUpdate(
      id,
      productValidate,
      { new: true }
    );
    if (!updateProductData) {
      return res.status(404).json({ error: "Product not found" });
    }

    await cacheService.del(`product:${id}`);
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

    await cacheService.del(`product:${id}`),
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
