import { z } from "zod";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  emailOnlySchema,
} from "../../shared/src/schemas/auth.js";

const oauthProfileSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerId: z.string().min(1),
  email: z.string().email({
    error: "Please enter a valid email address",
  }),
  username: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
});

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  oauthProfileSchema,
  emailOnlySchema,
};
