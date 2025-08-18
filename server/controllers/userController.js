const { z } = require("zod");
const User = require("../models/userModel");
const {
  userIdParamZodSchema,
  updateUserZodSchema,
  emailParamZodSchema,
} = require("../schemas/userZodSchema");

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({ deletedAt: null });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
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

const getUserByEmailController = async (req, res) => {
  try {
    const { email } = await emailParamZodSchema.parseAsync(req.params);
    const user = await User.findOne({ email, deletedAt: null });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      user: user,
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

const updateUserController = async (req, res) => {
  try {
    const { id } = await userIdParamZodSchema.parseAsync(req.params);
    const updateData = await updateUserZodSchema.parseAsync(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      updateData,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
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
const deleteUserController = async (req, res) => {
  try {
    const { id } = await userIdParamZodSchema.parseAsync(req.params);
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const deleteUser = await User.findOneAndUpdate(
      { _id: id },
      { deletedAt: Date.now() },
      { new: true }
    );
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deleteUser });
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
  getAllUsersController,
  getUserByEmailController,
  updateUserController,
  deleteUserController,
};
