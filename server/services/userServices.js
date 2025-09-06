import User from "../models/userModel.js";

export const upsertOAuthUser = async (profile) => {
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
