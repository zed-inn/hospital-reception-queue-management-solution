import { DomainError } from "@errors/domain.error";

export class QueueNotFoundError extends DomainError<{ id: string }> {
  constructor(id: string) {
    super({
      name: "ERR_NOT_FOUND",
      message: "Requested queue not found",
      type: "not found error",
      ctx: { id },
    });
  }
}

export class QueueNotRunningError extends DomainError<{ id: string }> {
  constructor(id: string) {
    super({
      name: "ERR_NOT_RUNNING",
      message:
        "Requested action is not possible due to queue not running currently",
      type: "business rule violation",
      ctx: { id },
    });
  }
}
