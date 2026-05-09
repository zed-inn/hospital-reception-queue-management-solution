import { Queue } from "@entities/queue/queue.entity";
import { QueueId } from "@entities/queue/queue.vos";

export interface QueueDetailsRepository {
  existsById(id: QueueId): Promise<boolean>;
  save<T>(q: Queue): Promise<T>;
}
