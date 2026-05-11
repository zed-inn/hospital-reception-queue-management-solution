import { authenticate } from "@hooks/auth.plugin";
import { AddQueueDetailsBodySchema } from "./queue.schema";
import { QueueHandler } from "./queue.handler";

export async function QueueRouter(router: ZodFastifyInstance) {
  router.post(
    "/",
    {
      schema: { body: AddQueueDetailsBodySchema },
      preValidation: [authenticate],
    },
    QueueHandler.addQueueDetails,
  );

  router.post(
    "/action/pause",
    { preValidation: [authenticate] },
    QueueHandler.pauseQueue,
  );

  router.post(
    "/action/resume",
    { preValidation: [authenticate] },
    QueueHandler.resumeQueue,
  );
}
