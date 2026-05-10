import { Patient } from "@entities/patient-profile/patient.entity";
import { PatientPosition } from "@entities/patient-profile/patient.vos";
import { QueueId } from "@entities/queue/queue.vos";
import { PatientRepository } from "@interfaces/repos/patient-repo.interface";
import { RepositoryUnitOfWork } from "@interfaces/unit-of-work/repo-uow.interface";
import { LexoRank } from "@services/lexorank.service";
import { PatientAccessService } from "@services/patient-access.service";
import { QueueAccessService } from "@services/queue-access.service";

export type AddReturningPatientUseCaseParams = {
  queueId: string;
  tokenNumber: number;
};

export class AddReturningPatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientAccessRepository: PatientAccessService,
    private readonly queueAccessService: QueueAccessService,
    private readonly repoUow: RepositoryUnitOfWork,
  ) {}

  async execute(params: AddReturningPatientUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);
    this.queueAccessService.ensureRunning(queue);

    const patient = await this.patientAccessRepository.getPatient(
      queue.id,
      params.tokenNumber,
    );
    this.patientAccessRepository.ensureReturning(patient);

    const patientPosition = await this.getPosition(queue.id);

    patient.setWaiting(patientPosition.value);

    if (patientPosition.equals(PatientPosition.start()))
      patient.setInConsultation();

    return await this.patientRepository.save(patient);
  }

  private async getPosition(queueId: QueueId) {
    const lastReturningPatient =
      await this.patientRepository.getLastReturningByPositionInQueue(queueId);
    if (!lastReturningPatient) {
      const topPatient =
        await this.patientRepository.getTopByPositionInQueue(queueId);
      if (!topPatient) return PatientPosition.start();

      return await this.getPositionFromNext2PositionsAfter(queueId, topPatient);
    }

    return await this.getPositionFromNext2PositionsAfter(
      queueId,
      lastReturningPatient,
    );
  }

  private async getPositionFromNext2PositionsAfter(
    queueId: QueueId,
    patient: Patient,
  ) {
    const patientPosition =
      this.patientAccessRepository.getPositionFromPatient(patient);

    const [first, second] =
      await this.patientRepository.getNext2PatientsByPositionAfterPositionInQueue(
        queueId,
        patientPosition,
      );

    if (!first && !second) return patientPosition.next();

    const fPos = this.patientAccessRepository.getPositionFromPatient(first);
    if (!second) return fPos.next();

    const sPos = this.patientAccessRepository.getPositionFromPatient(second);

    const newPos = LexoRank.average(fPos.value, sPos.value);
    return PatientPosition.create(newPos);
  }
}
