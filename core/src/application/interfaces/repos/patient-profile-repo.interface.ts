import { PatientProfile } from "@entities/patient-profile/patient-profile.entity";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface PatientProfileRepository {
  save<T>(patientProfile: PatientProfile, ctx?: RepoUowCtx): Promise<T>;
}
