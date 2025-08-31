const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/", wishlistController.getUserWishList);
router.post("/", wishlistController.addItemToWishlist);
router.delete("/", wishlistController.removeItemFromWishlist);
