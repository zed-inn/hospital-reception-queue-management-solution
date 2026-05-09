import { DomainError } from "./domain.error";

export type ValidationErrorCtx = {
  expected?: unknown;
  recieved: unknown;
};

export class ValidationError extends DomainError<ValidationErrorCtx> {
  constructor(params: {
    name: string;
    message: string;
    ctx?: ValidationErrorCtx;
  }) {
    super({
      name: params.name,
      message: params.name,
      type: "validation error",
      ...(params.ctx ? { ctx: params.ctx } : {}),
    });
  }
}
