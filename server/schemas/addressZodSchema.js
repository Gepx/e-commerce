const { z } = require("zod");

const baseAddressSchema = {
  label: z.string({ required_error: "Label is required" }).trim(),
  recipientName: z
    .string({ required_error: "Recipient name is required" })
    .trim()
    .min(2, "Recipient name must be at least 2 characters")
    .max(50, "Recipient name cannot be more than 50 characters"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
  street: z
    .string({ required_error: "Street is required" })
    .trim()
    .min(2, "Street must be at least 2 characters")
    .max(100, "Street cannot be more than 100 characters"),
  city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot be more than 100 characters"),
  province: z
    .string({ required_error: "Province is required" })
    .trim()
    .min(2, "Province must be at least 2 characters")
    .max(100, "Province cannot be more than 100 characters"),
  postalCode: z
    .string({ required_error: "Postal code is required" })
    .trim()
    .regex(/^[0-9]{5,10}$/, "Please enter a valid postal code"),
  isDefault: z.boolean().optional().default(false),
};

const createAddressSchema = z.object(baseAddressSchema);

const updateAddressSchema = z.object({
  label: baseAddressSchema.label.optional(),
  recipientName: baseAddressSchema.recipientName.optional(),
  phone: baseAddressSchema.phone.optional(),
  street: baseAddressSchema.street.optional(),
  city: baseAddressSchema.city.optional(),
  province: baseAddressSchema.province.optional(),
  postalCode: baseAddressSchema.postalCode.optional(),
  isDefault: baseAddressSchema.isDefault,
});

const addressIdParamSchema = z.object({
  id: z.string({ error: "Invalid address ID format" }),
});

module.exports = {
  createAddressSchema,
  updateAddressSchema,
  addressIdParamSchema,
};
