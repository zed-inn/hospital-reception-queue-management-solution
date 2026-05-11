import { QUEUE_TYPE } from "hospital-reception-system";
import z from "zod";

export const AddQueueDetailsBodySchema = z.object({
  name: z.string(),
  type: z.enum(QUEUE_TYPE),
});

export type AddQueueDetailsBody = z.infer<typeof AddQueueDetailsBodySchema>;
