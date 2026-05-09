import { ValidationError } from "@errors/validation.error";
import { BaseVo } from "./base.vo";

export class PositiveIntegerVo<Name extends string> extends BaseVo<
  Name,
  number
> {
  protected static validate(x: unknown) {
    if (typeof x !== "number") throw this.invalidTypeError(x);

    if (isNaN(x)) throw this.nanValueError(x);

    if (x <= 0) throw this.nonPositiveValueError(x);

    if (!Number.isInteger(x)) throw this.nonIntegerValueError(x);

    return x;
  }

  protected static invalidTypeError(x: unknown) {
    return new ValidationError({
      name: "ERR_INVALID_TYPE",
      message: "Value must be of type number",
      ctx: { expected: "number", recieved: x },
    });
  }

  protected static nanValueError(x: number) {
    return new ValidationError({
      name: "ERR_NAN_VALUE",
      message: "Value cannot be a NaN value",
      ctx: { expected: "valid number", recieved: x },
    });
  }

  protected static nonPositiveValueError(x: number) {
    return new ValidationError({
      name: "ERR_NON_POSITIVE",
      message: "Value must be a positive number",
      ctx: { expected: "positive number", recieved: x },
    });
  }

  protected static nonIntegerValueError(x: number) {
    return new ValidationError({
      name: "ERR_NON_INT",
      message: "Value must be an integer",
      ctx: { expected: "integer", recieved: x },
    });
  }
}
