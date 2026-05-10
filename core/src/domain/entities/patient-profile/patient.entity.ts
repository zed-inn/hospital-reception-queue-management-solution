import { ValidationError } from "@errors/validation.error";
import { PATIENT_STATUS, PATIENT_TYPE } from "./patient.constants";
import {
  PatientId,
  PatientName,
  PatientPhone,
  PatientPosition,
  PatientStatus,
  PatientTicketedAt,
  PatientTokenNumber,
  PatientType,
} from "./patient.vos";
import { QueueId } from "@entities/queue/queue.vos";

export class Patient {
  private readonly _id: PatientId;
  private readonly _queueId: QueueId;
  private _name: PatientName;
  private _phone: PatientPhone;
  private _status: PatientStatus;
  private _type: PatientType;
  private _position: PatientPosition | null;
  private readonly _tokenNumber: PatientTokenNumber;
  private readonly _ticketedAt: PatientTicketedAt;

  constructor(params: {
    id: string;
    queueId: string;
    name: string;
    phone: { number: string; countryCode: number };
    status: PATIENT_STATUS;
    type: PATIENT_TYPE;
    position?: string | null;
    tokenNumber: number;
    ticketedAt: Date;
  }) {
    this._id = PatientId.create(params.id);
    this._queueId = QueueId.create(params.queueId);
    this._name = PatientName.create(params.name);
    this._phone = PatientPhone.create(params.phone);
    this._status = PatientStatus.create(params.status);
    this._type = PatientType.create(params.type);
    this._position = params.position
      ? PatientPosition.create(params.position)
      : null;
    this._tokenNumber = PatientTokenNumber.create(params.tokenNumber);
    this._ticketedAt = PatientTicketedAt.create(params.ticketedAt);
  }

  get id() {
    return this._id;
  }
  get queueId() {
    return this._queueId;
  }
  get name() {
    return this._name;
  }
  get phone() {
    return this._phone;
  }
  get status() {
    return this._status;
  }
  get type() {
    return this._type;
  }
  get position() {
    return this._position;
  }
  get tokenNumber() {
    return this._tokenNumber;
  }
  get ticketedAt() {
    return this._ticketedAt;
  }

  get isWaiting() {
    return this._status.equals(PATIENT_STATUS.WAITING);
  }
  get isInConsultation() {
    return this._status.equals(PATIENT_STATUS.IN_CONSULTATION);
  }
  get willBeReturning() {
    return this._status.equals(PATIENT_STATUS.WILL_BE_RETURNING);
  }
  get resolved() {
    return this._status.equals(PATIENT_STATUS.RESOLVED);
  }

  get isNormal() {
    return this._type.equals(PATIENT_TYPE.NORMAL);
  }
  get isReturning() {
    return this._type.equals(PATIENT_TYPE.RETURNING);
  }

  get isInQueue() {
    return this._position !== null;
  }

  setWaiting(position?: string) {
    if (!this._position && !position)
      throw new ValidationError({
        name: "ERR_POSITION_REQ",
        message: "Position in queue is required when waiting",
      });

    this._status = PatientStatus.create(PATIENT_STATUS.WAITING);
  }

  setInConsultation() {
    if (!this._status.equals(PATIENT_STATUS.WAITING))
      throw new ValidationError({
        name: "ERR_NO_WAIT",
        message: "A patient has to wait before going for consultation",
      });

    this._status = PatientStatus.create(PATIENT_STATUS.IN_CONSULTATION);
  }

  setWillBeReturning() {
    this._type = PatientType.create(PATIENT_TYPE.RETURNING);
    this._status = PatientStatus.create(PATIENT_STATUS.WILL_BE_RETURNING);
    this._position = null;
  }

  setResolved() {
    this._status = PatientStatus.create(PATIENT_STATUS.RESOLVED);
    this._position = null;
  }
}
