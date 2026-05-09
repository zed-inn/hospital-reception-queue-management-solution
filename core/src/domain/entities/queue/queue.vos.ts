import { EnumVo } from "@vos/enum.vo";
import { NonEmptyString } from "@vos/non-empty-string.vo";
import { QUEUE_STATUS, QUEUE_TYPE } from "./queue.constants";

export class QueueId extends NonEmptyString<"QueueId"> {
  static create(x: unknown) {
    return new QueueId("QueueId", this.validate(x));
  }
}

export class QueueName extends NonEmptyString<"QueueName"> {
  static create(x: unknown) {
    return new QueueName("QueueName", this.validate(x));
  }
}

export class QueueType extends EnumVo<"QueueType", QUEUE_TYPE> {
  protected static override values = Object.values(QUEUE_TYPE);

  protected static override validate(x: unknown) {
    return super.validate(x) as QUEUE_TYPE;
  }

  static create(x: unknown) {
    return new QueueType("QueueType", this.validate(x));
  }
}

export class QueueStatus extends EnumVo<"QueueStatus", QUEUE_STATUS> {
  protected static override values = Object.values(QUEUE_STATUS);

  protected static override validate(x: unknown) {
    return super.validate(x) as QUEUE_STATUS;
  }

  static create(x: unknown) {
    return new QueueStatus("QueueStatus", this.validate(x));
  }
}
