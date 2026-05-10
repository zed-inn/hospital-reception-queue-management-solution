import { QUEUE_STATUS, QUEUE_TYPE } from "@entities/queue/queue.constants";
import { Queue } from "@entities/queue/queue.entity";
import { QueueId } from "@entities/queue/queue.vos";
import { DomainError } from "@errors/domain.error";
import { QueueNotFoundError } from "@errors/queue.errors";
import { QueueAccountRepository } from "@interfaces/repos/queue-account-repo.interface";
import { QueueDetailsRepository } from "@interfaces/repos/queue-details-repo.interface";

export type AddQueueDetailsUseCaseParams = {
  id: string;
  name: string;
  type: QUEUE_TYPE;
};

export class AddQueueDetailsUseCase {
  constructor(
    private readonly queueAccountRepo: QueueAccountRepository,
    private readonly queueDetailsRepo: QueueDetailsRepository,
  ) {}

  async execute(params: AddQueueDetailsUseCaseParams) {
    if (await this.queueAccountRepo.existsById(QueueId.create(params.id)))
      throw new QueueNotFoundError(params.id);
    await this.checkQueueDetailsAlreadyFilled(params.id);

    const queue = new Queue({
      id: params.id,
      name: params.name,
      type: params.type,
      status: QUEUE_STATUS.STOPPED,
    });

    return await this.queueDetailsRepo.save(queue);
  }

  private async checkQueueDetailsAlreadyFilled(id: string) {
    if (await this.queueDetailsRepo.existsById(QueueId.create(id)))
      throw new QueueDetailsAlreadyFilledError();
  }
}

export class QueueDetailsAlreadyFilledError extends DomainError {
  override name = "ERR_QUEUE_DETAILS_ALREADY_FILLED";
  override message =
    "Cannot fill details of a queue whose details have already been filled";
}
