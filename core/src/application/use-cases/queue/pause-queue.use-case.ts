import { QueueDetailsRepository } from "@interfaces/repos/queue-details-repo.interface";
import { QueueAccessService } from "@services/queue-access.service";

export type PauseQueueUseCaseParams = {
  id: string;
};

export class PauseQueueUseCase {
  constructor(
    private readonly queueDetailsRepository: QueueDetailsRepository,
    private readonly queueAccessService: QueueAccessService,
  ) {}

  async execute(params: PauseQueueUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.id);

    queue.pause();

    return await this.queueDetailsRepository.save(queue);
  }
}
