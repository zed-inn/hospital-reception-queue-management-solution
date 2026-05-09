import { ValidationError } from "@errors/validation.error";
import { BaseVo } from "./base.vo";

export class TimezoneOffsetedDate<Name extends string> extends BaseVo<
  Name,
  Date
> {
  protected static validate(x: unknown) {
    if (typeof x === "string") x = new Date(x);

    if (!(x instanceof Date) || Number.isNaN(x.getTime()))
      throw this.invalidTypeError(x);

    return x;
  }

  protected static invalidTypeError(x: unknown) {
    return new ValidationError({
      name: "ERR_INVALID_TYPE",
      message: "Value must be a timezone offset-ed date",
      ctx: { expected: "Date", recieved: x },
    });
  }
}
