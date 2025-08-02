const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const UserController = require("../controllers/userController");
const router = express.Router();

router.get("/", UserController.getAllUsersController);
router.get("/:email", verifyToken, UserController.getUserByEmailController);
router.put("/:id", verifyToken, UserController.updateUserController);
router.delete("/:id", verifyToken, UserController.deleteUserController);

module.exports = router;
