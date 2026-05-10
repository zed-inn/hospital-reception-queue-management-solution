import { QueueId } from "@entities/queue/queue.vos";

export interface QueueAccountRepository {
  existsById(id: QueueId): Promise<boolean>;
}
