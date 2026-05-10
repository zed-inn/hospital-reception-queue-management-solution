import { Patient } from "@entities/patient-profile/patient.entity";
import { PatientRepository } from "@interfaces/repos/patient-repo.interface";
import { QueueAccessService } from "@services/queue-access.service";
import { WaitingTimeService } from "@services/waiting-time.service";

export type GetPatientInQueueUseCaseParams = {
  queueId: string;
  limit?: number;
};

export class GetPatientInQueueUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly queueAccessService: QueueAccessService,
  ) {}

  async execute(params: GetPatientInQueueUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);

    const patientsLimit = typeof params.limit === "number" ? params.limit : 5;

    const patients = await this.patientRepository.getPositioned(
      queue.id,
      patientsLimit,
    );

    const result = patients.map((p, i) => ({
      patient: p,
      estimatedWaitTime: WaitingTimeService.getEstimatedWaitTime(i),
    }));

    return result;
  }
}
