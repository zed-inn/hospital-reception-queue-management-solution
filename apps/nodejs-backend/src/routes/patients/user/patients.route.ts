import { PatientHandler } from "./patients.handler";
import { GetDetailsParamsSchema } from "./patients.schema";

export async function UserPatientRouter(router: ZodFastifyInstance) {
  router.get(
    "/:patientId",
    { schema: { params: GetDetailsParamsSchema } },
    PatientHandler.getPatientDetails,
  );
}
