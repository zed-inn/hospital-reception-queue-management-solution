import z from "zod";

export const GetPatientsQuerySchema = z.object({
  limit: z.int().positive().nullable().default(null),
});

export type GetPatientsQuery = z.infer<typeof GetPatientsQuerySchema>;

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
  tokenNumber: z.int().positive().min(1),
});

export type AddReturningPatientParams = z.infer<
  typeof AddReturningPatientParamsSchema
>;

export const NextPatientParamsSchema = z.object({
  patientId: z.uuidv7(),
});

export type NextPatientParams = z.infer<typeof NextPatientParamsSchema>;
