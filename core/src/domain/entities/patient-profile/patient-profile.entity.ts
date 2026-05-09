import {
  PATIENT_PROFILE_STATUS,
  PATIENT_PROFILE_TYPE,
} from "./patient-profile.constants";
import {
  PatientProfileId,
  PatientProfileName,
  PatientProfilePhone,
  PatientProfileStatus,
  PatientProfileTicketedAt,
  PatientProfileTokenNumber,
  PatientProfileType,
} from "./patient-profile.vos";

export class PatientProfile {
  private readonly _id: PatientProfileId;
  private _name: PatientProfileName;
  private _phone: PatientProfilePhone;
  private _status: PatientProfileStatus;
  private _type: PatientProfileType;
  private _tokenNumber: PatientProfileTokenNumber;
  private _ticketedAt: PatientProfileTicketedAt;

  constructor(params: {
    id: string;
    name: string;
    phone: { number: string; countryCode: number };
    status: PATIENT_PROFILE_STATUS;
    type: PATIENT_PROFILE_TYPE;
    tokenNumber: number;
    ticketedAt: Date;
  }) {
    this._id = PatientProfileId.create(params.id);
    this._name = PatientProfileName.create(params.name);
    this._phone = PatientProfilePhone.create(params.phone);
    this._status = PatientProfileStatus.create(params.status);
    this._type = PatientProfileType.create(params.type);
    this._tokenNumber = PatientProfileTokenNumber.create(params.tokenNumber);
    this._ticketedAt = PatientProfileTicketedAt.create(params.ticketedAt);
  }

  get id() {
    return this._id;
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
  get tokenNumber() {
    return this._tokenNumber;
  }
  get ticketedAt() {
    return this._ticketedAt;
  }

  get isWaiting() {
    return this._status.equals(PATIENT_PROFILE_STATUS.WAITING);
  }
  get isInConsultation() {
    return this._status.equals(PATIENT_PROFILE_STATUS.IN_CONSULTATION);
  }
  get willBeReturning() {
    return this._status.equals(PATIENT_PROFILE_STATUS.WILL_BE_RETURNING);
  }
  get resolved() {
    return this._status.equals(PATIENT_PROFILE_STATUS.RESOLVED);
  }

  get isNormal() {
    return this._type.equals(PATIENT_PROFILE_TYPE.NORMAL);
  }
  get isReturning() {
    return this._type.equals(PATIENT_PROFILE_TYPE.RETURNING);
  }

  setStatus(status: PATIENT_PROFILE_STATUS) {
    this._status = PatientProfileStatus.create(status);
  }

  setType(type: PATIENT_PROFILE_TYPE) {
    this._type = PatientProfileType.create(type);
  }
}
