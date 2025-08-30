const {
  createAddressSchema,
  updateAddressSchema,
  addressIdParamSchema,
} = require("../schemas/addressZodSchema");
const { userIdParamZodSchema } = require("../schemas/userZodSchema");
const Address = require("../models/addressModel");
const { z } = require("zod");

const getUserAddresses = async (req, res) => {
  try {
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });
    const userAddresses = await Address.find({ user: userId, deletedAt: null });

    res.status(200).json({
      message: "User addresses retrieved successfully",
      addresses: userAddresses,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const addUserAddress = async (req, res) => {
  try {
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });
    const addresses = await createAddressSchema.parseAsync(req.body);
    const newAddress = new Address({ ...addresses, user: userId });
    if (!newAddress) {
      return res.status(400).json({ message: "Invalid address data" });
    }

    await newAddress.save();
    res.status(201).json({
      message: "Address created successfully",
      address: newAddress,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });
    const { id: addressId } = await addressIdParamSchema.parseAsync(req.params);
    const addresses = await updateAddressSchema.parseAsync(req.body);

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        user: userId,
        deletedAt: null,
      },
      addresses,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        message: "Address not found or you do not have permission to edit it",
      });
    }

    res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id: userId } = await userIdParamZodSchema.parseAsync({
      id: req.user.id,
    });
    const { id: addressId } = await addressIdParamSchema.parseAsync(req.params);

    const addressDeleted = await Address.findOneAndUpdate(
      {
        _id: addressId,
        user: userId,
      },
      { deletedAt: Date.now() },
      { new: true }
    );

    if (!addressDeleted) {
      return res.status(404).json({
        message: "Address not found or you do not have permission to edit it",
      });
    }

    res.status(200).json({
      message: "Address deleted successfully",
      address: addressDeleted,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

module.exports = {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
