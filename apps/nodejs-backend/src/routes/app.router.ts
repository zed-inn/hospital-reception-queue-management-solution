import { AuthRouter } from "./auth/auth.route";
import { ReceptionPatientRouter } from "./patients/reception/patients.route";
import { UserPatientRouter } from "./patients/user/patients.route";

const routes: Record<string, (router: ZodFastifyInstance) => Promise<void>> = {
  "/auth": AuthRouter,
  "/queue/:queueId/u/patient": UserPatientRouter,
  "/queue/:queueId/r/patient/": ReceptionPatientRouter,
};

const router = async (app: ZodFastifyInstance) => {
  for (const [prefix, route] of Object.entries(routes))
    app.register(route, { prefix });
};

export default router;
