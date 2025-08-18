const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const UserController = require("../controllers/userController");
const authorizeRoles = require("../middleware/roleMiddleware");
const router = express.Router();

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  UserController.getAllUsersController
);
router.get(
  "/:email",
  verifyToken,
  authorizeRoles("admin"),
  UserController.getUserByEmailController
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

module.exports = router;
