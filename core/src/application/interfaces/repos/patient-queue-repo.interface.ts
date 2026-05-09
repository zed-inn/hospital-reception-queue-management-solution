import { PatientProfile } from "@entities/patient-profile/patient-profile.entity";
import { PatientQueue } from "@entities/patient-queue/patient-queue.entity";
import { QueueId } from "@entities/queue/queue.vos";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface PatientQueueRepository {
  countPatientsInQueue(id: QueueId, ctx?: RepoUowCtx): Promise<number>;
  getLastPatientInQueue(
    id: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<PatientProfile | null>;
  save<T>(patientQueue: PatientQueue, ctx?: RepoUowCtx): Promise<T>;
}
