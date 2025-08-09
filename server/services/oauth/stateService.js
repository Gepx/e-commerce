const bcrypt = require("bcryptjs");

async function setOAuthState(res) {
  const state = await bcrypt.hash(
    Math.random().toString(36).substring(2, 15),
    10
  );
  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 60 * 1000,
  });
  return state;
}

function validateOAuthState(req) {
  const cookieState = req.cookies.oauth_state;
  const state = req.query?.state;
  return Boolean(state && cookieState && state === cookieState);
}

function clearOAuthState(res) {
  res.clearCookie("oauth_state");
}

module.exports = { setOAuthState, validateOAuthState, clearOAuthState };
