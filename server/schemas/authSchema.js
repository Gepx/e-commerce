const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, { error: "Username must be more than 3 characters long" }),
  email: z.email({
    error: "Please enter a valid email address",
  }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"
      ),
      {
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
  role: z.string().optional(),
});

const loginSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address",
  }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"
      ),
      {
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});

const forgotPasswordSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address",
  }),
});

const verifyOtpSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address",
  }),
  otp: z.string().min(6).max(6),
});

const resetPasswordSchema = z.object({
  token: z.string({ error: "Token is required" }),
  newPassword: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"
      ),
      {
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};
