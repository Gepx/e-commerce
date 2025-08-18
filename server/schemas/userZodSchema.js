const { z } = require("zod");

const updateUserZodSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .trim()
    .min(3, { error: "Username must be more than 3 characters long" })
    .max(10, "Username cannot be more than 10 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(30, "First name cannot be more than 30 characters long")
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(30, "Last name cannot be more than 30 characters long")
    .optional(),
  gender: z
    .enum(["male", "female", "other"], {
      error: "Please select a valid gender!",
    })
    .optional(),
  dob: z.coerce
    .date({ error: "Invalid date format" })
    .refine((date) => date < new Date(), {
      message: "Date of birth must be in the past",
    })
    .optional(),
  avatarUrl: z.url({ error: "Invalid avatar URL" }).nullable().optional(),
});

const userIdParamZodSchema = z.object({
  id: z.string(),
});

const emailParamZodSchema = z.object({
  email: z.email("Invalid email format"),
});

module.exports = {
  updateUserZodSchema,
  userIdParamZodSchema,
  emailParamZodSchema,
};
