import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastify from "fastify";
import { env } from "./env";

const app = fastify({
  logger: env.NODE_ENV === "dev",
  trustProxy: env.NODE_ENV === "prod",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCookie);
app.register(fastifyJwt, { secret: env.JWT_SECRET });

export default app;
