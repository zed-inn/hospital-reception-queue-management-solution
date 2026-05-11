import { env } from "@config/env";
import app from "@config/fastify";
import db from "@config/postgres-db";
import { PostgresConn } from "@db/postgres-connection";
import { Server } from "@infra/server";
import router from "@routes/app.router";

const pgConn = new PostgresConn({ pgPool: db });

const server = new Server({
  fastifyApp: app,
  fastifyRouter: router,
  host: env.HOST,
  port: env.PORT,
  pgConnection: pgConn,
});

server.start();
