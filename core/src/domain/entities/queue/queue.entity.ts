import { ValidationError } from "@errors/validation.error";
import { QUEUE_STATUS, QUEUE_TYPE } from "./queue.constants";
import { QueueId, QueueName, QueueStatus, QueueType } from "./queue.vos";

export class Queue {
  private readonly _id: QueueId;
  private _name: QueueName;
  private _type: QueueType;
  private _status: QueueStatus;

  constructor(params: {
    id: string;
    name: string;
    type: QUEUE_TYPE;
    status: QUEUE_STATUS;
  }) {
    this._id = QueueId.create(params.id);
    this._name = QueueName.create(params.name);
    this._type = QueueType.create(params.type);
    this._status = QueueStatus.create(params.status);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get type() {
    return this._type;
  }
  get status() {
    return this._status;
  }

  get isDoctorsQueue() {
    return this._type.equals(QUEUE_TYPE.DOCTOR_QUEUE);
  }
  get isTestingQueue() {
    return this._type.equals(QUEUE_TYPE.TESTING_QUEUE);
  }
  get isLabQueue() {
    return this._type.equals(QUEUE_TYPE.LAB_QUEUE);
  }

  get isRunning() {
    return this._status.equals(QUEUE_STATUS.RUNNING);
  }
  get isPaused() {
    return this._status.equals(QUEUE_STATUS.PAUSED);
  }
  get isStopped() {
    return this._status.equals(QUEUE_STATUS.STOPPED);
  }

  start() {
    if (this.isRunning)
      throw new ValidationError({
        name: "ERR_QUEUE_RUNNING",
        message: "Cannot start a queue that is already running",
      });

    this._status = QueueStatus.create(QUEUE_STATUS.RUNNING);
  }

  pause() {
    if (!this.isRunning)
      throw new ValidationError({
        name: "ERR_QUEUE_NOT_RUNNING",
        message: "Queue cannot be paused if it's not running already",
      });

    this._status = QueueStatus.create(QUEUE_STATUS.PAUSED);
  }

  stop() {
    if (this.isStopped)
      throw new ValidationError({
        name: "ERR_QUEUE_STOPPED",
        message: "Cannot stop a queue that is already stopped",
      });

    this._status = QueueStatus.create(QUEUE_STATUS.STOPPED);
  }
}
