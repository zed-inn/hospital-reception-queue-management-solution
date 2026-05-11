import { OAuth2Client } from "google-auth-library";
import { env } from "./env";

const googleOAuth2 = new OAuth2Client(
  env.OAUTH_GOOGLE_CLIENT_ID,
  env.OAUTH_GOOGLE_CLIENT_SECRET,
  env.OAUTH_GOOGLE_REDIRECT_URI,
);

export default googleOAuth2;
