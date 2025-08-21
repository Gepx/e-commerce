const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const UserController = require("../controllers/userController");
const authorizeRoles = require("../middleware/roleMiddleware");
const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  UserController.getUserController
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  UserController.updateUserController
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  UserController.deleteUserController
);

router.get("/:userId", verifyToken, UserController.getUserProfileController);

module.exports = router;
