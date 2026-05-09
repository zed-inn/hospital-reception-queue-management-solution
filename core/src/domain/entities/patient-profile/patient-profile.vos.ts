import { ValidationError } from "@errors/validation.error";
import { RegexValidationService } from "@services/regex-validation.service";
import { BaseVo } from "@vos/base.vo";
import { EnumVo } from "@vos/enum.vo";
import { NonEmptyString } from "@vos/non-empty-string.vo";
import { PositiveIntegerVo } from "@vos/positive-integer.vo";
import {
  PATIENT_PROFILE_STATUS,
  PATIENT_PROFILE_TYPE,
} from "./patient-profile.constants";
import { TimezoneOffsetedDate } from "@vos/timezone-offseted-date.vo";

export class PatientProfileId extends NonEmptyString<"PatientProfileId"> {
  static create(x: unknown) {
    return new PatientProfileId("PatientProfileId", this.validate(x));
  }
}

export class PatientProfileName extends NonEmptyString<"PatientProfileName"> {
  static create(x: unknown) {
    return new PatientProfileName("PatientProfileName", this.validate(x));
  }
}

// -- Patient profile phone --

export class PatientProfilePhoneNumber extends NonEmptyString<"PatientProfilePhoneNumber"> {
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
    return new PatientProfilePhoneNumber(
      "PatientProfilePhoneNumber",
      this.validate(x),
    );
  }
}

export class PatientProfilePhoneCountryCode extends PositiveIntegerVo<"PatientProfilePhoneCountryCode"> {
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
    return new PatientProfilePhoneCountryCode(
      "PatientProfilePhoneCountryCode",
      this.validate(x),
    );
  }
}

export class PatientProfilePhone extends BaseVo<
  "PatientProfilePhone",
  {
    number: PatientProfilePhoneNumber;
    countryCode: PatientProfilePhoneCountryCode;
  }
> {
  protected static validate(x: unknown) {
    if (typeof x !== "object" || x === null || Array.isArray(x))
      throw this.invalidTypeError(x);

    const typeValidatedX = x as Record<string, unknown>;

    const number = PatientProfilePhoneNumber.create(typeValidatedX["number"]);
    const countryCode = PatientProfilePhoneCountryCode.create(
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
    return new PatientProfilePhone("PatientProfilePhone", this.validate(x));
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

export class PatientProfileStatus extends EnumVo<
  "PatientProfileStatus",
  PATIENT_PROFILE_STATUS
> {
  protected static override values = Object.values(PATIENT_PROFILE_STATUS);

  protected static override validate(x: unknown) {
    return super.validate(x) as PATIENT_PROFILE_STATUS;
  }

  static create(x: unknown) {
    return new PatientProfileStatus("PatientProfileStatus", this.validate(x));
  }
}

export class PatientProfileType extends EnumVo<
  "PatientProfileType",
  PATIENT_PROFILE_TYPE
> {
  protected static override values = Object.values(PATIENT_PROFILE_TYPE);

  protected static override validate(x: unknown) {
    return super.validate(x) as PATIENT_PROFILE_TYPE;
  }

  static create(x: unknown) {
    return new PatientProfileType("PatientProfileType", this.validate(x));
  }
}

export class PatientProfileTokenNumber extends PositiveIntegerVo<"PatientProfileTokenNumber"> {
  static create(x: unknown) {
    return new PatientProfileTokenNumber(
      "PatientProfileTokenNumber",
      this.validate(x),
    );
  }

  static start() {
    return new PatientProfileTokenNumber("PatientProfileTokenNumber", 1);
  }

  next() {
    return new PatientProfileTokenNumber(
      "PatientProfileTokenNumber",
      this._data + 1,
    );
  }
}

export class PatientProfileTicketedAt extends TimezoneOffsetedDate<"PatientProfileTicketedAt"> {
  static create(x: unknown) {
    return new PatientProfileTicketedAt(
      "PatientProfileTicketedAt",
      this.validate(x),
    );
  }
}
