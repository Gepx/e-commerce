const express = require("express");
const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", verifyToken, cartController.getUserCart);
router.post("/", verifyToken, cartController.addItemToCart);
router.put("/", verifyToken, cartController.updateCartItem);
router.delete("/", verifyToken, cartController.removeCartItem);

module.exports = router;
