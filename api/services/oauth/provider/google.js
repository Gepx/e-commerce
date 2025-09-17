import axios from "axios";

export default {
  name: "google",

  getAuthorizedUrl(state) {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_CLIENT_CALLBACK_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      include_granted_scopes: "true",
      prompt: "select_account",
      state,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },

  async exchangeCodeForToken(code, state) {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_CLIENT_CALLBACK_URI,
      })
    );
    if (!data.access_token) throw new Error("No access token from Google");
    return data.access_token;
  },

  async fetchProfile(accessToken) {
    const { data } = await axios.get(
      "https://openidconnect.googleapis.com/v1/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!data.email || !data.email_verified)
      throw new Error("No verified email found from Google");

    return {
      provider: "google",
      providerId: data.sub,
      email: data.email,
      username: data.name || data.email.split("@")[0],
      avatarUrl: data.picture,
    };
  },
};
