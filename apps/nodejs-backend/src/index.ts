import { env } from "@config/env";
import app from "@config/fastify";
import db from "@config/postgres-db";
import { PostgresConn } from "@db/postgres-connection";
import { Server } from "@infra/server";

const pgConn = new PostgresConn({ pgPool: db });

const server = new Server({
  fastifyApp: app,
  host: env.HOST,
  port: env.PORT,
  pgConnection: pgConn,
});

server.start();
