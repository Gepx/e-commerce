const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/addressController");

router.get("/", AddressController.getUserAddresses);
router.post("/", AddressController.addUserAddress);
router.put("/:id", AddressController.updateUserAddress);
router.delete("/:id", AddressController.deleteUserAddress);

module.exports = router;
