const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.get("/", cartController.getUserCart);
router.post("/", cartController.addItemToCart);
router.delete("/", cartController.removeCartItem);

module.exports = router;
