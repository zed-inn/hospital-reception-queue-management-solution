import { QueueId } from "@entities/queue/queue.vos";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface QueueAccountRepository {
  existsById(id: QueueId, ctx?: RepoUowCtx): Promise<boolean>;
}
