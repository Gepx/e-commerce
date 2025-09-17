import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, { error: "Username must be more than 3 characters long" })
    .max(10, "Username cannot be more than 10 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email({ error: "Please enter a valid email address" }),
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

export const loginSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email address" }),
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

export const forgotPasswordSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email address" }),
});

export const verifyOtpSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email address" }),
  otp: z.string().min(6).max(6, { error: "OTP must be 6 digits" }),
});

export const resetPasswordSchema = z.object({
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

export const resetPasswordConfirmSchema = resetPasswordSchema
  .pick({ newPassword: true })
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const emailOnlySchema = z.object({
  email: z.string().email({ error: "Please enter a valid email address" }),
});
