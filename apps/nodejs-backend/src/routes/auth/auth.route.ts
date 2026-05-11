import { LoginBodySchema } from "./auth.schema";
import { AuthHandler } from "./auth.handler";

export async function AuthRouter(router: ZodFastifyInstance) {
  router.post(
    "/login/google",
    { schema: { body: LoginBodySchema } },
    AuthHandler.loginGoogle,
  );
}
