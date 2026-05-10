import { Patient } from "@entities/patient-profile/patient.entity";
import {
  PatientId,
  PatientTokenNumber,
} from "@entities/patient-profile/patient.vos";
import { QueueId } from "@entities/queue/queue.vos";
import { PatientNotFoundError } from "@errors/patient.errors";
import { ValidationError } from "@errors/validation.error";
import { PatientRepository } from "@interfaces/repos/patient-repo.interface";

export class PatientAccessService {
  constructor(private readonly patientRepository: PatientRepository) {}

  getPatient(id: string): Promise<Patient>;
  getPatient(queueId: QueueId, tokenNumber: number): Promise<Patient>;

  async getPatient(id: string | QueueId, tn?: number) {
    if (typeof id === "string") {
      const Patient = await this.patientRepository.getById(
        PatientId.create(id),
      );
      if (!Patient) throw new PatientNotFoundError({ id });

      return Patient;
    } else if (id instanceof QueueId && typeof tn === "number") {
      const Patient = await this.patientRepository.getByTokenNumber(
        id,
        PatientTokenNumber.create(tn),
      );
      if (!Patient) throw new PatientNotFoundError({ tokenNumber: tn });

      return Patient;
    } else
      throw new ValidationError({
        name: "ERR_INVALID_TYPE",
        message: "Id must be of type string and tokenNumber be of type number",
        ctx: {
          expected: tn ? "string, number" : "string",
          recieved: tn ? { id, tokenNumber: tn } : id,
        },
      });
  }

  getPositionFromPatient(patient: Patient) {
    if (!patient.position)
      throw new ValidationError({
        name: "ERR_NO_POS",
        message: "Position is required on requested patient",
      });
    return patient.position;
  }

  ensureReturning(patient: Patient) {
    if (!patient.isReturning)
      throw new ValidationError({
        name: "ERR_NOT_RETURNING",
        message: "Patient has(d) not set to be returning patient",
      });
  }
}
