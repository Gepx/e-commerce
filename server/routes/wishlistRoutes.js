const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, wishlistController.getUserWishList);
router.post("/", verifyToken, wishlistController.addItemToWishlist);
router.delete("/", verifyToken, wishlistController.removeItemFromWishlist);

module.exports = router;
