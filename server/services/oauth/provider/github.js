import axios from "axios";

export default {
  name: "github",

  getAuthorizedUrl(state) {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: process.env.GITHUB_CLIENT_CALLBACK_URI,
      scope: "read:user user:email",
      state,
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  },

  async exchangeCodeForToken(code, state) {
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CLIENT_CALLBACK_URI,
        state,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    if (!data.access_token) throw new Error("No access token from Github");
    return data.access_token;
  },

  async fetchProfile(accessToken) {
    const [userRes, emailsRes] = await Promise.all([
      axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const gh = userRes.data;
    const emails = emailsRes.data || [];
    const primaryEmail =
      emails.find((e) => e.primary && e.verified)?.email ||
      emails.find((e) => e.verified)?.email ||
      gh.email;

    if (!primaryEmail) throw new Error("No verified email found from Github");

    return {
      provider: "github",
      providerId: gh.id,
      email: primaryEmail,
      username: gh.name || gh.login,
      avatarUrl: gh.avatar_url,
    };
  },
};
