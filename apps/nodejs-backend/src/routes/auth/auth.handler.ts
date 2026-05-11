import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody } from "./auth.schema";
import googleOAuth2 from "@config/google-oauth2-client";
import { env } from "@config/env";
import { AuthService } from "./auth.service";

export class AuthHandler {
  static async loginGoogle(
    req: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ) {
    const { code, email } = req.body;

    const { tokens } = await googleOAuth2.getToken(code);
    if (!tokens.id_token)
      return reply.code(400).send({ error: "ERR_ID_TOKEN_MISSING" });

    const ticket = await googleOAuth2.verifyIdToken({
      idToken: tokens.id_token,
      audience: env.OAUTH_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email_verified)
      return reply.code(403).send({ error: "ERR_EMAIL_NOT_VERIFIED" });
    if (email && payload.email !== email)
      return reply.code(403).send({ error: "ERR_EMAIL_MISMATCH" });

    const user =
      (await AuthService.getByEmail(email)) ??
      ((await AuthService.create({
        email,
        createdAt: new Date(),
      })) as AuthUserPayload);

    const token = reply.jwtSign(user, { expiresIn: "7d" });

    return reply.code(200).send({ token });
  }
}
