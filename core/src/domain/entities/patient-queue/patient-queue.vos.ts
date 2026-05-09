import { NonEmptyString } from "@vos/non-empty-string.vo";

export class PatientQueuePosition extends NonEmptyString<"PatientQueuePosition"> {
  static create(x: unknown) {
    return new PatientQueuePosition("PatientQueuePosition", this.validate(x));
  }
}
