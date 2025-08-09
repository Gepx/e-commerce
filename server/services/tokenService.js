const jwt = require("jsonwebtoken");

module.exports.issue = function issue(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports.setAuthCookie = function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 60 * 1000,
    sameSite: "lax",
  });
};
