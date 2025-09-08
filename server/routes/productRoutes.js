import express from "express";
import ProductController from "../controllers/productController.js";
import upload from "../config/multer.js";
import { productCacheMiddleware } from "../middleware/cache/cacheMiddleware.js";

const router = express.Router();

router.get("/", productCacheMiddleware, ProductController.getAllProducts);
router.get("/:id", productCacheMiddleware, ProductController.getProductById);
router.post(
  "/",
  upload.array("productImages", 10),
  ProductController.createProduct
);
router.put(
  "/:id",
  upload.array("productImages", 10),
  ProductController.updateProduct
);
router.delete("/:id", ProductController.deleteProduct);

export default router;
