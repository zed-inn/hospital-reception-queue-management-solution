import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  HOST: z.string().trim().default("localhost"),
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
});

export const env = envSchema.parse(process.env);
