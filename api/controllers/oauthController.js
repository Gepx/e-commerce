import providers from "../services/oauth/providerFactory.js";
import {
  clearOAuthState,
  setOAuthState,
  validateOAuthState,
} from "../services/oauth/stateService.js";
import { issue, setAuthCookie } from "../services/tokenService.js";
import { upsertOAuthUser } from "../services/userServices.js";

const redirect = async (req, res) => {
  const provider = providers.get(req.params.provider);
  if (!provider) return res.status(404).send("Provider not found");
  const state = await setOAuthState(res);
  return res.redirect(provider.getAuthorizedUrl(state));
};

const callback = async (req, res) => {
  try {
    const provider = providers.get(req.params.provider);
    if (!provider) return res.status(404).send("Provider not found");
    if (!validateOAuthState(req))
      return res.status(400).send("Invalid OAuth state");

    const accessToken = await provider.exchangeCodeForToken(
      req.query.code,
      req.query.state
    );
    const profile = await provider.fetchProfile(accessToken);
    const user = await upsertOAuthUser(profile);

    const token = issue(user);
    clearOAuthState(res);
    setAuthCookie(res, token);

    return res.redirect(process.env.CLIENT_URL || "http://localhost:8000");
  } catch (error) {
    res.status(500).json({ error: error.message });
    return res.redirect(
      `${
        process.env.CLIENT_URL || "http://localhost:8000"
      }/auth/error?message=oauth_failed`
    );
  }
};

export default {
  redirect,
  callback,
};
