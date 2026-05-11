import { LoginBodySchema } from "./auth.schema";
import { AuthHandler } from "./auth.handler";
import { authenticate } from "@hooks/auth.plugin";

export async function AuthRouter(router: ZodFastifyInstance) {
  router.post(
    "/login/google",
    { schema: { body: LoginBodySchema }, preHandler: [authenticate] },
    AuthHandler.loginGoogle,
  );
}
