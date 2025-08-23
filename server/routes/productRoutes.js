const express = require("express");
const ProductController = require("../controllers/productController");
const upload = require("../config/multer");
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
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

module.exports = router;
