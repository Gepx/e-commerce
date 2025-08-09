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

module.exports.upsertOAuthUser = async (profile) => {
  let user = await User.findOne({
    $or: [
      { provider: profile.provider, providerId: String(profile.providerId) },
      { email: profile.email },
    ],
    deletedAt: null,
  });

  if (!user) {
    user = new User({
      username: profile.username,
      email: profile.email,
      provider: profile.provider,
      providerId: String(profile.providerId),
      avatarUrl: profile.avatarUrl,
      role: "user",
    });
  } else {
    user.provider = profile.provider;
    user.providerId = String(profile.providerId);
    user.avatarUrl = profile.avatarUrl || user.avatarUrl;
    user.username = user.username || profile.username;
  }

  await user.save();
  return user;
};
