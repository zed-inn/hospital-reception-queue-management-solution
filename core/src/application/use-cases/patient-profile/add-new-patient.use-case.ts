import { PATIENT_PROFILE_STATUS } from "@entities/patient-profile/patient-profile.constants";
import { PatientProfile } from "@entities/patient-profile/patient-profile.entity";
import { PatientProfileTokenNumber } from "@entities/patient-profile/patient-profile.vos";
import { PatientQueue } from "@entities/patient-queue/patient-queue.entity";
import { QueueId } from "@entities/queue/queue.vos";
import { PatientProfileRepository } from "@interfaces/repos/patient-profile-repo.interface";
import { PatientQueueRepository } from "@interfaces/repos/patient-queue-repo.interface";
import { RepositoryUnitOfWork } from "@interfaces/unit-of-work/repo-uow.interface";
import { IdGenerator } from "@interfaces/utils/id-generator.interface";
import { LexoRank } from "@services/lexorank.service";
import { QueueAccessService } from "@services/queue-access.service";

export type AddNewPatientUseCaseParams = {
  queueId: string;
  name: string;
  phone: { number: string; countryCode: number };
  currentTimezoneOffsetedDate: Date;
};

export class AddNewPatientUseCase {
  constructor(
    private readonly patientProfileRepository: PatientProfileRepository,
    private readonly patientQueueRepository: PatientQueueRepository,
    private readonly queueAccessService: QueueAccessService,
    private readonly repoUow: RepositoryUnitOfWork,
    private readonly idGen: IdGenerator,
  ) {}

  async execute(params: AddNewPatientUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);
    this.queueAccessService.ensureRunning(queue);

    const id = await this.idGen.generateAsync();
    const tokenNumber = await this.getTokenNumber(queue.id);
    const patientProfile = new PatientProfile({
      id,
      tokenNumber: tokenNumber.value,
      name: params.name,
      phone: params.phone,
      status: PATIENT_PROFILE_STATUS.WAITING,
      ticketedAt: params.currentTimezoneOffsetedDate,
    });

    if (await this.isQueueEmpty(queue.id))
      patientProfile.setStatus(PATIENT_PROFILE_STATUS.IN_CONSULTATION);

    const patientQueue = new PatientQueue({
      queueId: queue.id.value,
      patientProfileId: patientProfile.id.value,
      position: LexoRank.add(LexoRank.min, 1000),
    });

    return await this.repoUow.atomic(async (ctx) => {
      const res = await this.patientProfileRepository.save(patientProfile, ctx);
      await this.patientQueueRepository.save(patientQueue, ctx);
      return res;
    });
  }

  async getTokenNumber(queueId: QueueId) {
    const lastPatientProfile =
      await this.patientQueueRepository.getLastPatientInQueue(queueId);
    if (!lastPatientProfile) return PatientProfileTokenNumber.start();

    return lastPatientProfile.tokenNumber.next();
  }

  async isQueueEmpty(queueId: QueueId) {
    const patientProfileCounts =
      await this.patientQueueRepository.countPatientsInQueue(queueId);

    return patientProfileCounts <= 0;
  }
}
