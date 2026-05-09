import { Queue } from "@entities/queue/queue.entity";
import { QueueId } from "@entities/queue/queue.vos";
import { QueueNotFoundError, QueueNotRunningError } from "@errors/queue.errors";
import { QueueDetailsRepository } from "@interfaces/repos/queue-details-repo.interface";

export class QueueAccessService {
  constructor(
    private readonly queueDetailsRepository: QueueDetailsRepository,
  ) {}

  async getQueue(id: string) {
    const queue = await this.queueDetailsRepository.getById(QueueId.create(id));
    if (!queue) throw new QueueNotFoundError(id);

    return queue;
  }

  ensureRunning(queue: Queue) {
    if (!queue.isRunning) throw new QueueNotRunningError(queue.id.value);
  }
}
