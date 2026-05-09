import { ValidationError } from "@errors/validation.error";
import { BaseVo } from "./base.vo";

export class NonEmptyString<Name extends string> extends BaseVo<Name, string> {
  protected static validate(x: unknown) {
    if (typeof x !== "string") throw this.invalidTypeError(x);

    const trimmedValue = x.trim();
    if (trimmedValue.length <= 0) throw this.emptyValError(x);

    return trimmedValue;
  }

  protected static invalidTypeError(x: unknown) {
    return new ValidationError({
      name: "ERR_INVALID_TYPE",
      message: "Value must be of type string",
      ctx: { expected: "string", recieved: x },
    });
  }

  protected static emptyValError(x: string) {
    return new ValidationError({
      name: "ERR_EMPTY_VAL",
      message: "Value cannot be empty",
      ctx: { expected: "non-empty string", recieved: x },
    });
  }
}
