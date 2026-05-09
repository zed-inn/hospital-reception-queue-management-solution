import { ValidationError } from "@errors/validation.error";
import { BaseVo } from "./base.vo";

export class EnumVo<
  Name extends string,
  DT extends string | number,
> extends BaseVo<Name, DT> {
  protected static values: (string | number)[] = [];

  protected static validate(x: unknown) {
    if (this.values.length <= 0) throw this.noValuesError(x);

    if (typeof x !== "string" && typeof x !== "number")
      throw this.invalidTypeError(x);

    if (this.values.indexOf(x) === -1) throw this.invalidValueError(x);

    return x;
  }

  protected static noValuesError(x: unknown) {
    return new ValidationError({
      name: "ERR_NO_VALUES",
      message: "No allowed values set for validation",
      ctx: { recieved: x },
    });
  }

  protected static invalidTypeError(x: unknown) {
    return new ValidationError({
      name: "ERR_INVALID_TYPE",
      message: "Value must be either of type string or number",
      ctx: { expected: "string | number", recieved: x },
    });
  }

  protected static invalidValueError(x: unknown) {
    return new ValidationError({
      name: "ERR_INVALID_VALUE",
      message: "Value must be an allowed value",
      ctx: { expected: this.values.join(" | "), recieved: x },
    });
  }
}
