const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const OAuthController = require("../controllers/oauthController");
const { validateSchema } = require("../utils/validateSchema");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} = require("../schemas/authSchema");
const verifyToken = require("../middleware/authMiddleware");

router.post(
  "/register",
  validateSchema(registerSchema),
  AuthController.register
);
router.post("/login", validateSchema(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);

router.get("/me", verifyToken, AuthController.me);

// Reset Password
router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  "/verify-otp",
  validateSchema(verifyOtpSchema),
  AuthController.verifyOtp
);
router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  AuthController.resetPassword
);

// Provider Auth Routes
router.get("/:provider", OAuthController.redirect);
router.get("/:provider/callback", OAuthController.callback);

module.exports = router;
