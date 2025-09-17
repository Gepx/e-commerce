import User from "../models/userModel.js";
import nodemailer from "nodemailer";

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

export const sendOtpEmail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || "no-reply@example.com",
    to: toEmail,
    subject: "Your password reset code",
    text: `Your one-time code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your one-time code is <b>${otp}</b>. It expires in 10 minutes.</p>`,
  });

  return info?.messageId;
};
