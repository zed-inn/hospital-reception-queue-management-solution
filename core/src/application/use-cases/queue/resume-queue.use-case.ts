import { QueueDetailsRepository } from "@interfaces/repos/queue-details-repo.interface";
import { QueueAccessService } from "@services/queue-access.service";

export type ResumeQueueUseCaseParams = {
  id: string;
};

export class ResumeQueueUseCase {
  constructor(
    private readonly queueDetailsRepository: QueueDetailsRepository,
    private readonly queueAccessService: QueueAccessService,
  ) {}

  async execute(params: ResumeQueueUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.id);

    queue.start();

    return await this.queueDetailsRepository.save(queue);
  }
}
