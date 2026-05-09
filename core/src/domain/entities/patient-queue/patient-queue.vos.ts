import { LexoRank } from "@services/lexorank.service";
import { NonEmptyString } from "@vos/non-empty-string.vo";

export class PatientQueuePosition extends NonEmptyString<"PatientQueuePosition"> {
  static create(x: unknown) {
    return new PatientQueuePosition("PatientQueuePosition", this.validate(x));
  }

  add(x: number) {
    const newPos = LexoRank.add(this._data, x);
    return new PatientQueuePosition("PatientQueuePosition", newPos);
  }

  subtract(x: number) {
    const newPos = LexoRank.subtract(this._data, x);
    return new PatientQueuePosition("PatientQueuePosition", newPos);
  }
}
