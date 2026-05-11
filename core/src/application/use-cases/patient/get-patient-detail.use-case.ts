import { PatientRepository } from "@interfaces/repos/patient-repo.interface";
import { PatientAccessService } from "@services/patient-access.service";
import { QueueAccessService } from "@services/queue-access.service";
import { WaitingTimeService } from "@services/waiting-time.service";

export type GetPatientDetailUseCaseParams = {
  queueId: string;
  patientId: string;
};

export class GetPatientDetailUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientAccessService: PatientAccessService,
    private readonly queueAccessService: QueueAccessService,
  ) {}

  async execute(params: GetPatientDetailUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);
    this.queueAccessService.ensureRunning(queue);

    const patient = await this.patientAccessService.getPatient(
      params.patientId,
    );
    if (!patient.position) return { patient, estimatedWaitTime: null };

    const patientsBefore =
      await this.patientRepository.countPositionBeforePosition(
        queue.id,
        patient.position,
      );

    const result = {
      patient,
      estimatedWaitTime:
        WaitingTimeService.getEstimatedWaitTime(patientsBefore),
    };

    return result;
  }
}
