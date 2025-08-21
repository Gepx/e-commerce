const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const user = await User.findOne({ email, deletedAt: null });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).where({ deletedAt: null });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.validatedData;
    const user = await User.findOne({ email, deletedAt: null });

    if (!user) {
      if (process.env.NODE_ENV !== "production") {
        return res.status(404).json({ message: "Email not found (devOtp)" });
      }

      return res
        .status(200)
        .json({ message: "If that email exists, an OTP was sent" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const payload = { message: "If that email exists, an OTP was sent" };

    if (process.env.NODE_ENV !== "production") {
      payload.devOtp = otp;
    }

    return res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.validatedData;
    const user = await User.findOne({ email, deletedAt: null });
    if (!user || !user.resetOtp || !user.resetOtpExpires) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOtpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const resetToken = jwt.sign(
      {
        email: user.email,
        purpose: "password_reset",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      message: "OTP verified successfully",
      resetToken: resetToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.validatedData;
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    if (payload.purpose !== "password_reset") {
      return res.status(400).json({ message: "Invalid token purpose" });
    }

    const user = await User.findOne({ email: payload.email, deletedAt: null });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    user.resetOtp = null;
    user.resetOtpExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
