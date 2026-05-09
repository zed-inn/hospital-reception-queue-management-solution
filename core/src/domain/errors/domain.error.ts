export type DomainErrorType =
  | "validation error"
  | "business rule violation"
  | "not found error";

export class DomainError<T = never> extends Error {
  override readonly name: string = "ERR_DOMAIN";
  readonly type: DomainErrorType | "domain error" = "domain error";
  readonly ctx: T | null = null;

  constructor(params?: {
    name: string;
    message: string;
    type: DomainErrorType;
    ctx?: T;
  }) {
    super(params?.message ?? "Domain error occurred");
    if (params?.name) this.name = params.name;
    if (params?.type) this.type = params.type;
    this.ctx = params?.ctx ?? null;

    Object.freeze(this);
  }
}
