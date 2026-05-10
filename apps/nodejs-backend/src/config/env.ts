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
});

export const env = envSchema.parse(process.env);
