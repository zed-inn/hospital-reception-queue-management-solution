import { Patient } from "@entities/patient-profile/patient.entity";
import {
  PatientId,
  PatientPosition,
  PatientTokenNumber,
} from "@entities/patient-profile/patient.vos";
import { QueueId } from "@entities/queue/queue.vos";
import { RepoUowCtx } from "@interfaces/unit-of-work/repo-uow.interface";

export interface PatientRepository {
  existsById(id: PatientId, ctx?: RepoUowCtx): Promise<boolean>;
  getById(id: PatientId, ctx?: RepoUowCtx): Promise<Patient | null>;
  getByTokenNumber(
    qId: QueueId,
    tokenNum: PatientTokenNumber,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null>;
  save<T>(patient: Patient, ctx?: RepoUowCtx): Promise<T>;

  getLastInQueue(qid: QueueId, ctx?: RepoUowCtx): Promise<Patient | null>;

  getLastByPositionInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null>;
  getTopByPositionInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null>;
  getLastReturningByPositionInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null>;
  getNext2PatientsByPositionAfterPositionInQueue(
    qId: QueueId,
    position: PatientPosition,
    ctx?: RepoUowCtx,
  ): Promise<[Patient, Patient | null] | [null, null]>;
}
