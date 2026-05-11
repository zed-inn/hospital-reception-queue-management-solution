import {
  PATIENT_STATUS,
  PATIENT_TYPE,
  QUEUE_STATUS,
  QUEUE_TYPE,
} from "hospital-reception-system";

export class PatientRowMapper {
  private static readonly status = Object.values(PATIENT_STATUS);
  private static readonly type = Object.values(PATIENT_TYPE);

  static mapStatus(val: number | PATIENT_STATUS) {
    if (typeof val === "number" && val >= 0 && val < this.status.length)
      return this.status[val] as PATIENT_STATUS;

    return this.status.indexOf(val as PATIENT_STATUS);
  }

  static mapType(val: number | PATIENT_TYPE) {
    if (typeof val === "number" && val >= 0 && val < this.type.length)
      return this.type[val] as PATIENT_TYPE;

    return this.type.indexOf(val as PATIENT_TYPE);
  }
}

export class QueueRowMapper {
  private static readonly status = Object.values(QUEUE_STATUS);
  private static readonly type = Object.values(QUEUE_TYPE);

  static mapStatus(val: number | QUEUE_STATUS) {
    if (typeof val === "number" && val >= 0 && val < this.status.length)
      return this.status[val] as QUEUE_STATUS;

    return this.status.indexOf(val as QUEUE_STATUS);
  }

  static mapType(val: number | QUEUE_TYPE) {
    if (typeof val === "number" && val >= 0 && val < this.type.length)
      return this.type[val] as QUEUE_TYPE;

    return this.type.indexOf(val as QUEUE_TYPE);
  }
}
