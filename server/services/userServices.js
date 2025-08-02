const User = require("../models/userModel");

module.exports.getAllUsers = async () => {
  try {
    return await User.find({ deletedAt: null });
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

module.exports.getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email, deletedAt: null });
  } catch (error) {
    throw new Error("Error fetching user by email: " + error.message);
  }
};

module.exports.updateUser = async (id, updateData) => {
  try {
    updateData.updatedAt = new Date();
    return await User.findByIdAndUpdate(id, updateData, { new: true }).where({
      deletedAt: null,
    });
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

module.exports.deleteUser = async (id) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};
