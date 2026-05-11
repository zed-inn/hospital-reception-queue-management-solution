import z from "zod";

export const GetDetailsParamsSchema = z.object({
  queueId: z.uuidv7(),
  patientId: z.uuidv7(),
});

export type GetDetailsParams = z.infer<typeof GetDetailsParamsSchema>;
