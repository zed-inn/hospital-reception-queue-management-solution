import { PatientProfile } from "@entities/patient-profile/patient-profile.entity";
import {
  PatientProfileId,
  PatientProfileTokenNumber,
} from "@entities/patient-profile/patient-profile.vos";
import { PatientProfileNotFoundError } from "@errors/patient-profile.errors";
import { ValidationError } from "@errors/validation.error";
import { PatientProfileRepository } from "@interfaces/repos/patient-profile-repo.interface";

export class PatientProfileAccessService {
  constructor(
    private readonly patientProfileRepository: PatientProfileRepository,
  ) {}

  getPatientProfile(id: string): Promise<PatientProfile>;
  getPatientProfile(tokenNumber: number): Promise<PatientProfile>;

  async getPatientProfile(arg: unknown) {
    if (typeof arg === "string") {
      const patientProfile = await this.patientProfileRepository.getById(
        PatientProfileId.create(arg),
      );
      if (!patientProfile) throw new PatientProfileNotFoundError({ id: arg });

      return patientProfile;
    } else if (typeof arg === "number") {
      const patientProfile =
        await this.patientProfileRepository.getByTokenNumber(
          PatientProfileTokenNumber.create(arg),
        );
      if (!patientProfile)
        throw new PatientProfileNotFoundError({ tokenNumber: arg });

      return patientProfile;
    } else
      throw new ValidationError({
        name: "ERR_INVALID_TYPE",
        message: "Value must be of type string or number",
        ctx: { expected: "string | number", recieved: arg },
      });
  }
}
