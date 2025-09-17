import { z } from "zod";
import User from "../models/userModel.js";
import {
  userIdParamZodSchema,
  updateUserZodSchema,
  queryParamZodSchema,
} from "../schemas/userZodSchema.js";
import createQueryParams from "../utils/queryHelper.js";
import streamUpload from "../config/cloudinary.js";
import cacheService from "../services/cacheService.js";

const getUserController = async (req, res) => {
  try {
    const { page, limit, email } = await queryParamZodSchema.parseAsync(
      req.query
    );

    const cacheKey = `users:${JSON.stringify(req.query)}`;
    const cachedUsers = await cacheService.get(cacheKey);

    if (cachedUsers) {
      return res.status(200).json(cachedUsers);
    }

    const offset = (page - 1) * limit;

    if (email) {
      const user = await User.findOne({ email, deletedAt: null });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "User retrieved successfully",
        user,
      });
    }

    const { page: _p, limit: _l, ...filters } = req.query;
    const conditions = createQueryParams(filters, "user");
    conditions.deletedAt = null;

    const [users, total] = await Promise.all([
      User.find(conditions).skip(offset).limit(limit).sort({ updatedAt: -1 }),
      User.countDocuments(conditions),
    ]);

    const response = {
      message: "Users retrieved successfully",
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    await cacheService.set(cacheKey, response, 600);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json([
        {
          message: "Invalid data provided",
          errors: error.errors,
        },
      ]);
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

    await cacheService.delete(`user:${id}`),
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

    await cacheService.delete(`user:${id}`),
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

const getUserProfileController = async (req, res) => {
  try {
    const { userId } = req.user.id;
    const cacheKey = `userProfile:${userId}`;
    const cachedUser = await cacheService.get(cacheKey);
    if (cachedUser) {
      return res.status(200).json(cachedUser);
    }
    const user = await User.findById(userId).where({ deletedAt: null });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = {
      message: "User profile retrieved successfully",
      user,
    };
    await cacheService.set(cacheKey, response, 300);
    res.status(200).json(response);
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

const updateAvatarController = async (req, res) => {
  try {
    const { id } = await userIdParamZodSchema.parseAsync(req.params);

    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const uploadRes = await streamUpload(req.file.buffer);

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { avatarUrl: uploadRes.secure_url },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    await cacheService.delete(`user:${id}`);

    res
      .status(200)
      .json({ message: "Avatar updated successfully", user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid data provided", errors: error.errors });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const removeAvatarController = async (req, res) => {
  try {
    const { id } = await userIdParamZodSchema.parseAsync(req.params);

    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      { avatarUrl: null },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    await cacheService.delete(`user:${id}`);

    res
      .status(200)
      .json({ message: "Avatar removed successfully", user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid data provided", errors: error.errors });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

export default {
  getUserController,
  updateUserController,
  deleteUserController,
  getUserProfileController,
  updateAvatarController,
  removeAvatarController,
};
