import { DomainError } from "@errors/domain.error";

export class PatientNotFoundError extends DomainError<
  { id: string } | { tokenNumber: number }
> {
  constructor(params: { id: string } | { tokenNumber: number }) {
    super({
      name: "ERR_NOT_FOUND",
      message: "Requested patient not found",
      type: "not found error",
      ctx: params,
    });
  }
}
