const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/addressController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, AddressController.getUserAddresses);
router.post("/", verifyToken, AddressController.addUserAddress);
router.put("/:id", verifyToken, AddressController.updateUserAddress);
router.delete("/:id", verifyToken, AddressController.deleteUserAddress);

module.exports = router;
