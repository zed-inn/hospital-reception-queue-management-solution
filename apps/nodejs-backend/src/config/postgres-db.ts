import { Pool } from "pg";
import { env } from "./env";

const db = new Pool({
  host: env.PG_HOST,
  port: env.PG_PORT,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  query_timeout: 5000,
  connectionTimeoutMillis: 2000,
});

export default db;
