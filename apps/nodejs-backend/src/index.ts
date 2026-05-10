import { env } from "@config/env";
import app from "@config/fastify";
import { Server } from "@infra/server";

const server = new Server({ fastifyApp: app, host: env.HOST, port: env.PORT });

server.start();
