import { PatientProfile } from "@entities/patient-profile/patient-profile.entity";
import { PatientQueue } from "@entities/patient-queue/patient-queue.entity";
import { PatientQueuePosition } from "@entities/patient-queue/patient-queue.vos";
import { QueueId } from "@entities/queue/queue.vos";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface PatientQueueRepository {
  countPatientsInQueue(id: QueueId, ctx?: RepoUowCtx): Promise<number>;
  getLastPatientInQueue(
    id: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<PatientQueue | null>;
  save<T>(patientQueue: PatientQueue, ctx?: RepoUowCtx): Promise<T>;
  getLastReturningPatientInQueue(
    id: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<PatientQueue | null>;
  getTopPatientInQueue(
    id: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<PatientQueue | null>;
  getNext2PatientInQueueAfterPosition(
    id: QueueId,
    position: PatientQueuePosition,
    ctx?: RepoUowCtx,
  ): Promise<
    [PatientQueue, PatientQueue] | [PatientQueue, null] | [null, null]
  >;
}
