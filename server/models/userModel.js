const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.provider;
    },
  },
  provider: {
    type: String,
    enum: ["google", "github"],
    default: null,
  },
  providerId: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  resetOtp: {
    type: String,
    default: null,
  },
  resetOtpExpires: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
