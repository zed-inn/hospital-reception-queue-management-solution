import { AuthRouter } from "./auth/auth.route";
import { ReceptionPatientRouter } from "./patients/reception/patients.route";
import { UserPatientRouter } from "./patients/user/patients.route";
import { QueueRouter } from "./queue/queue.route";

const routes: Record<string, (router: ZodFastifyInstance) => Promise<void>> = {
  "/auth": AuthRouter,
  "/queue": QueueRouter,
  "/queue/patient/": ReceptionPatientRouter,
  "/queue/:queueId/patient": UserPatientRouter,
};

const router = async (app: ZodFastifyInstance) => {
  for (const [prefix, route] of Object.entries(routes))
    app.register(route, { prefix });
};

export default router;
