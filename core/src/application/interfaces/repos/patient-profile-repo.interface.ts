import { PatientProfile } from "@entities/patient-profile/patient-profile.entity";
import {
  PatientProfileId,
  PatientProfileTokenNumber,
} from "@entities/patient-profile/patient-profile.vos";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface PatientProfileRepository {
  getById(
    id: PatientProfileId,
    ctx?: RepoUowCtx,
  ): Promise<PatientProfile | null>;
  getByTokenNumber(
    tokenNumber: PatientProfileTokenNumber,
    ctx?: RepoUowCtx,
  ): Promise<PatientProfile | null>;
  save<T>(patientProfile: PatientProfile, ctx?: RepoUowCtx): Promise<T>;
}
