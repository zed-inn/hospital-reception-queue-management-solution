import { PatientsHandler } from "./patients.handler";
import {
  AddNewPatientBodySchema,
  AddNewPatientParamsSchema,
  AddReturningPatientParamsSchema,
  GetPatientsParamsSchema,
  GetPatientsQuerySchema,
  NextPatientParamsSchema,
} from "./patients.schema";

export async function ReceptionPatientRouter(router: ZodFastifyInstance) {
  router.get(
    "/",
    {
      schema: {
        querystring: GetPatientsQuerySchema,
        params: GetPatientsParamsSchema,
      },
    },
    PatientsHandler.getPatientsInQueue,
  );

  router.post(
    "/action/add",
    {
      schema: {
        params: AddNewPatientParamsSchema,
        body: AddNewPatientBodySchema,
      },
    },
    PatientsHandler.addNewPatient,
  );

  router.post(
    "/:tokenNumber/action/add",
    { schema: { params: AddReturningPatientParamsSchema } },
    PatientsHandler.addReturningPatient,
  );

  router.post(
    "/:patientId/action/next",
    { schema: { params: NextPatientParamsSchema } },
    PatientsHandler.nextPatient,
  );

  router.post(
    "/:patientId/action/resolve",
    { schema: { params: NextPatientParamsSchema } },
    PatientsHandler.resolveAndNextPatient,
  );
}
