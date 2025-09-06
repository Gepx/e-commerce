import express from "express";
import OAuthController from "../controllers/oauthController.js";
import AuthController from "../controllers/authController.js";
import { validateSchema } from "../middleware/validation/validateSchema.js";
import verifyToken from "../middleware/auth/authMiddleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../schemas/authSchema.js";
import { authLimiter } from "../utils/rateLimiter.js";

const router = express.Router();

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

export default router;
