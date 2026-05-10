import { ValidationError } from "@errors/validation.error";
import { RegexValidationService } from "@services/regex-validation.service";
import { BaseVo } from "@vos/base.vo";
import { EnumVo } from "@vos/enum.vo";
import { NonEmptyString } from "@vos/non-empty-string.vo";
import { PositiveIntegerVo } from "@vos/positive-integer.vo";
import {
  PATIENT_POSITION_GAP,
  PATIENT_STATUS,
  PATIENT_TYPE,
} from "./patient.constants";
import { TimezoneOffsetedDate } from "@vos/timezone-offseted-date.vo";
import { LexoRank } from "@services/lexorank.service";

export class PatientId extends NonEmptyString<"PatientId"> {
  static create(x: unknown) {
    return new PatientId("PatientId", this.validate(x));
  }
}

export class PatientName extends NonEmptyString<"PatientName"> {
  static create(x: unknown) {
    return new PatientName("PatientName", this.validate(x));
  }
}

// -- Patient profile phone --

export class PatientPhoneNumber extends NonEmptyString<"PatientPhoneNumber"> {
  protected static phoneRegex = /^\d{10}$/;

  protected static override validate(x: unknown) {
    const validatedVal = super.validate(x);

    if (RegexValidationService.fullMatch(validatedVal, this.phoneRegex))
      throw this.invalidPhoneNumberError(validatedVal);

    return validatedVal;
  }

  protected static invalidPhoneNumberError(x: string) {
    return new ValidationError({
      name: "ERR_INVALID_PHONE_NUMBER",
      message: "Patient's phone number cannot be an invalid phone number",
      ctx: { expected: "10-digits valid phone number", recieved: x },
    });
  }

  static create(x: unknown) {
    return new PatientPhoneNumber("PatientPhoneNumber", this.validate(x));
  }
}

export class PatientPhoneCountryCode extends PositiveIntegerVo<"PatientPhoneCountryCode"> {
  protected static override validate(x: unknown) {
    const validatedVal = super.validate(x);

    if (validatedVal <= 0 || validatedVal > 999)
      throw this.invalidCountryCodeError(validatedVal);

    return validatedVal;
  }

  protected static invalidCountryCodeError(x: number) {
    return new ValidationError({
      name: "ERR_INVALID_COUNTRY_CODE",
      message: "Patient's phone country code must be valid",
      ctx: { expected: "valid country code", recieved: x },
    });
  }

  static create(x: unknown) {
    return new PatientPhoneCountryCode(
      "PatientPhoneCountryCode",
      this.validate(x),
    );
  }
}

export class PatientPhone extends BaseVo<
  "PatientPhone",
  {
    number: PatientPhoneNumber;
    countryCode: PatientPhoneCountryCode;
  }
> {
  protected static validate(x: unknown) {
    if (typeof x !== "object" || x === null || Array.isArray(x))
      throw this.invalidTypeError(x);

    const typeValidatedX = x as Record<string, unknown>;

    const number = PatientPhoneNumber.create(typeValidatedX["number"]);
    const countryCode = PatientPhoneCountryCode.create(
      typeValidatedX["countryCode"],
    );

    return { number, countryCode };
  }

  protected static invalidTypeError(x: unknown) {
    return new ValidationError({
      name: "ERR_INVALID_TYPE",
      message: "Patient's phone must be an object of number and countryCode",
      ctx: {
        expected: { number: "string", countryCode: "number" },
        recieved: x,
      },
    });
  }

  static create(x: unknown) {
    return new PatientPhone("PatientPhone", this.validate(x));
  }

  get number() {
    return this._data.number.value;
  }
  get countryCode() {
    return `+${this._data.countryCode.value}`;
  }
  get numberWithCountryCode() {
    return `+${this._data.countryCode.value} ${this._data.number.value}`;
  }
}

// -- Patient profile phone --

export class PatientStatus extends EnumVo<"PatientStatus", PATIENT_STATUS> {
  protected static override values = Object.values(PATIENT_STATUS);

  protected static override validate(x: unknown) {
    return super.validate(x) as PATIENT_STATUS;
  }

  static create(x: unknown) {
    return new PatientStatus("PatientStatus", this.validate(x));
  }
}

export class PatientType extends EnumVo<"PatientType", PATIENT_TYPE> {
  protected static override values = Object.values(PATIENT_TYPE);

  protected static override validate(x: unknown) {
    return super.validate(x) as PATIENT_TYPE;
  }

  static create(x: unknown) {
    return new PatientType("PatientType", this.validate(x));
  }
}

export class PatientTokenNumber extends PositiveIntegerVo<"PatientTokenNumber"> {
  static create(x: unknown) {
    return new PatientTokenNumber("PatientTokenNumber", this.validate(x));
  }

  static start() {
    return new PatientTokenNumber("PatientTokenNumber", 1);
  }

  next() {
    return new PatientTokenNumber("PatientTokenNumber", this._data + 1);
  }
}

export class PatientTicketedAt extends TimezoneOffsetedDate<"PatientTicketedAt"> {
  static create(x: unknown) {
    return new PatientTicketedAt("PatientTicketedAt", this.validate(x));
  }
}

export class PatientPosition extends NonEmptyString<"PatientPosition"> {
  static create(x: unknown) {
    return new PatientPosition("PatientPosition", this.validate(x));
  }

  add(x: number) {
    const newPos = LexoRank.add(this._data, x);
    return new PatientPosition("PatientPosition", newPos);
  }

  subtract(x: number) {
    const newPos = LexoRank.subtract(this._data, x);
    return new PatientPosition("PatientPosition", newPos);
  }

  next() {
    return this.add(PATIENT_POSITION_GAP);
  }

  static start() {
    const pos = LexoRank.add(LexoRank.min, PATIENT_POSITION_GAP);
    return new PatientPosition("PatientPosition", pos);
  }
}
