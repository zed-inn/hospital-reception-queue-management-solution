import { Queue } from "@entities/queue/queue.entity";
import { QueueId } from "@entities/queue/queue.vos";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface QueueDetailsRepository {
  getById(id: QueueId, ctx?: RepoUowCtx): Promise<Queue | null>;
  existsById(id: QueueId, ctx?: RepoUowCtx): Promise<boolean>;
  save<T>(q: Queue, ctx?: RepoUowCtx): Promise<T>;
}
