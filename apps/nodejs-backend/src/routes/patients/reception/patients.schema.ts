import z from "zod";

export const GetPatientsParamsSchema = z.object({
  queueId: z.uuidv7(),
});

export type GetPatientsParams = z.infer<typeof GetPatientsParamsSchema>;

export const GetPatientsQuerySchema = z.object({
  limit: z.int().positive().nullable().default(null),
});

export type GetPatientsQuery = z.infer<typeof GetPatientsQuerySchema>;

export const AddNewPatientParamsSchema = z.object({
  queueId: z.uuidv7(),
});

export type AddNewPatientParams = z.infer<typeof AddNewPatientParamsSchema>;

export const AddNewPatientBodySchema = z.object({
  name: z.string(),
  phone: z.object({
    number: z.string().length(10),
    countryCode: z.int().positive().min(1).max(1000),
  }),
  timeZone: z.string(),
});

export type AddNewPatientBody = z.infer<typeof AddNewPatientBodySchema>;

export const AddReturningPatientParamsSchema = z.object({
  queueId: z.uuidv7(),
  tokenNumber: z.int().positive().min(1),
});

export type AddReturningPatientParams = z.infer<
  typeof AddReturningPatientParamsSchema
>;

export const NextPatientParamsSchema = z.object({
  queueId: z.uuidv7(),
  patientId: z.uuidv7(),
});

export type NextPatientParams = z.infer<typeof NextPatientParamsSchema>;
