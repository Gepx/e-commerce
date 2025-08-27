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
const { authLimiter } = require("../utils/rateLimiter");

router.post(
  "/register",
  authLimiter,
  validateSchema(registerSchema),
  AuthController.register
);
router.post(
  "/login",
  authLimiter,
  validateSchema(loginSchema),
  AuthController.login
);
router.post("/logout", AuthController.logout);

router.get("/me", verifyToken, AuthController.me);

// Reset Password
router.post(
  "/forgot-password",
  authLimiter,
  validateSchema(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  "/verify-otp",
  authLimiter,
  validateSchema(verifyOtpSchema),
  AuthController.verifyOtp
);
router.post(
  "/reset-password",
  authLimiter,
  validateSchema(resetPasswordSchema),
  AuthController.resetPassword
);

// Provider Auth Routes
router.get("/:provider", OAuthController.redirect);
router.get("/:provider/callback", OAuthController.callback);

module.exports = router;
