import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  HOST: z.string().trim().default("localhost"),
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  PG_HOST: z.string().trim().default("localhost"),
  PG_PORT: z.coerce.number().int().positive().default(5432),
  PG_USER: z.string().trim().min(1).default("postgres"),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string().trim().min(1),
  JWT_SECRET: z.string().default("secret"),
  OAUTH_GOOGLE_CLIENT_ID: z.string().trim().min(1),
  OAUTH_GOOGLE_CLIENT_SECRET: z.string().trim().min(1),
  OAUTH_GOOGLE_REDIRECT_URI: z.string().trim().min(1).default("/login/google"),
});

export const env = envSchema.parse(process.env);
