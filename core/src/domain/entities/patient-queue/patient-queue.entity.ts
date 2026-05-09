import { PatientProfileId } from "@entities/patient-profile/patient-profile.vos";
import { PatientQueuePosition } from "./patient-queue.vos";
import { QueueId } from "@entities/queue/queue.vos";

export class PatientQueue {
  private readonly _queueId: QueueId;
  private readonly _patientProfileId: PatientProfileId;
  private readonly _position: PatientQueuePosition;

  constructor(params: {
    queueId: string;
    patientProfileId: string;
    position: string;
  }) {
    this._queueId = QueueId.create(params.queueId);
    this._patientProfileId = PatientProfileId.create(params.patientProfileId);
    this._position = PatientQueuePosition.create(params.position);
  }

  get queueId() {
    return this._queueId;
  }
  get patientProfileId() {
    return this._patientProfileId;
  }
  get position() {
    return this._position;
  }
}
