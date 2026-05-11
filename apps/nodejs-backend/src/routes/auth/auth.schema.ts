import z from "zod";

export const LoginBodySchema = z.object({
  code: z.string(),
  email: z.email().endsWith("@gmail.com"),
});

export type LoginBody = z.infer<typeof LoginBodySchema>;
