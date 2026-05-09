import { PATIENT_PROFILE_TYPE } from "@entities/patient-profile/patient-profile.constants";
import { PatientQueue } from "@entities/patient-queue/patient-queue.entity";
import { PatientQueuePosition } from "@entities/patient-queue/patient-queue.vos";
import { QueueId } from "@entities/queue/queue.vos";
import { PatientProfileRepository } from "@interfaces/repos/patient-profile-repo.interface";
import { PatientQueueRepository } from "@interfaces/repos/patient-queue-repo.interface";
import { RepositoryUnitOfWork } from "@interfaces/unit-of-work/repo-uow.interface";
import { LexoRank } from "@services/lexorank.service";
import { PatientProfileAccessService } from "@services/patient-profile-access.service";
import { QueueAccessService } from "@services/queue-access.service";

export type AddReturningPatientUseCaseParams = {
  queueId: string;
  patientProfileId?: string;
  tokenNumber?: number;
};

export class AddReturningPatientUseCase {
  constructor(
    private readonly patientProfileRepository: PatientProfileRepository,
    private readonly patientQueueRepository: PatientQueueRepository,
    private readonly queueAccessService: QueueAccessService,
    private readonly patientProfileAccessService: PatientProfileAccessService,
    private readonly repoUow: RepositoryUnitOfWork,
  ) {}

  async execute(params: AddReturningPatientUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);
    this.queueAccessService.ensureRunning(queue);

    const patientProfileId = params.patientProfileId ?? "";
    const patientProfileTokenNumber = params.tokenNumber ?? null;
    const patientProfile = patientProfileTokenNumber
      ? await this.patientProfileAccessService.getPatientProfile(
          patientProfileTokenNumber,
        )
      : await this.patientProfileAccessService.getPatientProfile(
          patientProfileId,
        );

    patientProfile.setType(PATIENT_PROFILE_TYPE.RETURNING);

    const patientQueuePosition = await this.getPositionInQueue(queue.id);

    const patientQueue = new PatientQueue({
      queueId: queue.id.value,
      patientProfileId: patientProfile.id.value,
      position: patientQueuePosition.value,
    });

    return await this.repoUow.atomic(async (ctx) => {
      const res = await this.patientProfileRepository.save(patientProfile);
      await this.patientQueueRepository.save(patientQueue);
      return res;
    });
  }

  private async getPositionInQueue(queueId: QueueId) {
    const lastReturningPatientProfile =
      await this.patientQueueRepository.getLastReturningPatientInQueue(queueId);

    if (!lastReturningPatientProfile) {
      const topPatientProfile =
        await this.patientQueueRepository.getTopPatientInQueue(queueId);
      if (!topPatientProfile)
        return PatientQueuePosition.create(LexoRank.add(LexoRank.min, 1000));

      return await this.getPositionFromNext2PositionsAfter(
        queueId,
        topPatientProfile,
      );
    }

    return await this.getPositionFromNext2PositionsAfter(
      queueId,
      lastReturningPatientProfile,
    );
  }

  private async getPositionFromNext2PositionsAfter(
    queueId: QueueId,
    patientQueue: PatientQueue,
  ) {
    const next2PatientProfiles =
      await this.patientQueueRepository.getNext2PatientInQueueAfterPosition(
        queueId,
        patientQueue.position,
      );

    if (!next2PatientProfiles[0] && !next2PatientProfiles[1])
      return patientQueue.position.add(1000);

    if (!next2PatientProfiles[1])
      return next2PatientProfiles[0].position.add(1000);

    const newPos = LexoRank.average(
      next2PatientProfiles[0].position.value,
      next2PatientProfiles[1].position.value,
    );
    return PatientQueuePosition.create(newPos);
  }
}
