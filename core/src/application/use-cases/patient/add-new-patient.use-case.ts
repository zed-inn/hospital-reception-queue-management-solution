import {
  PATIENT_STATUS,
  PATIENT_TYPE,
} from "@entities/patient-profile/patient.constants";
import { Patient } from "@entities/patient-profile/patient.entity";
import {
  PatientPosition,
  PatientTokenNumber,
} from "@entities/patient-profile/patient.vos";
import { QueueId } from "@entities/queue/queue.vos";
import { PatientRepository } from "@interfaces/repos/patient-repo.interface";
import { IdGenerator } from "@interfaces/utils/id-generator.interface";
import { PatientAccessService } from "@services/patient-access.service";
import { QueueAccessService } from "@services/queue-access.service";

export type AddNewPatientUseCaseParams = {
  queueId: string;
  name: string;
  phone: { number: string; countryCode: number };
  currentTimezoneOffsetedDate: Date;
};

export class AddNewPatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientAccessService: PatientAccessService,
    private readonly queueAccessService: QueueAccessService,
    private readonly idGen: IdGenerator,
  ) {}

  async execute(params: AddNewPatientUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);
    this.queueAccessService.ensureRunning(queue);

    const id = await this.idGen.generateAsync();
    const tokenNumber = await this.getTokenNumber(queue.id);
    const [position, status] = await this.getPositionAndStatus(queue.id);
    const patient = new Patient({
      id,
      queueId: queue.id.value,
      tokenNumber: tokenNumber.value,
      name: params.name,
      phone: params.phone,
      status,
      type: PATIENT_TYPE.NORMAL,
      position: position.value,
      ticketedAt: params.currentTimezoneOffsetedDate,
    });

    return await this.patientRepository.save(patient);
  }

  private async getPositionAndStatus(
    qid: QueueId,
  ): Promise<[PatientPosition, PATIENT_STATUS]> {
    const lastPatient =
      await this.patientRepository.getLastByPositionInQueue(qid);
    if (!lastPatient)
      return [PatientPosition.start(), PATIENT_STATUS.IN_CONSULTATION];

    const patientPosition =
      this.patientAccessService.getPositionFromPatient(lastPatient);
    return [patientPosition.next(), PATIENT_STATUS.WAITING];
  }

  private async getTokenNumber(queueId: QueueId) {
    const lastPatient = await this.patientRepository.getLastInQueue(queueId);
    if (!lastPatient) return PatientTokenNumber.start();

    return lastPatient.tokenNumber.next();
  }
}
