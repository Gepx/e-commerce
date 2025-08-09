const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const OAuthController = require("../controllers/oauthController");
const { validateSchema } = require("../utils/validateSchema");
const { registerSchema, loginSchema } = require("../schemas/authSchema");

router.post(
  "/register",
  validateSchema(registerSchema),
  AuthController.register
);
router.post("/login", validateSchema(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);

// Provider Auth Routes
router.get("/:provider", OAuthController.redirect);
router.get("/:provider/callback", OAuthController.callback);

module.exports = router;
