import { authenticate } from "@hooks/auth.plugin";
import { PatientsHandler } from "./patients.handler";
import {
  AddNewPatientBodySchema,
  AddReturningPatientParamsSchema,
  GetPatientsQuerySchema,
  NextPatientParamsSchema,
} from "./patients.schema";

export async function ReceptionPatientRouter(router: ZodFastifyInstance) {
  router.get(
    "/",
    {
      schema: { querystring: GetPatientsQuerySchema },
      preValidation: [authenticate],
    },
    PatientsHandler.getPatientsInQueue,
  );

  router.post(
    "/action/add",
    {
      schema: { body: AddNewPatientBodySchema },
      preValidation: [authenticate],
    },
    PatientsHandler.addNewPatient,
  );

  router.post(
    "/:tokenNumber/action/add",
    {
      schema: { params: AddReturningPatientParamsSchema },
      preValidation: [authenticate],
    },
    PatientsHandler.addReturningPatient,
  );

  router.post(
    "/:patientId/action/next",
    {
      schema: { params: NextPatientParamsSchema },
      preValidation: [authenticate],
    },
    PatientsHandler.nextPatient,
  );

  router.post(
    "/:patientId/action/resolve",
    {
      schema: { params: NextPatientParamsSchema },
      preValidation: [authenticate],
    },
    PatientsHandler.resolveAndNextPatient,
  );
}
