import { ValidationError } from "@errors/validation.error";
import { PatientRepository } from "@interfaces/repos/patient-repo.interface";
import { RepositoryUnitOfWork } from "@interfaces/unit-of-work/repo-uow.interface";
import { PatientAccessService } from "@services/patient-access.service";
import { QueueAccessService } from "@services/queue-access.service";

export type NextPatientUseCaseParams = {
  queueId: string;
  patientId: string;
  resolved: boolean;
};

export class NextPatientUseCase {
  constructor(
    private patientRepository: PatientRepository,
    private patientAccessService: PatientAccessService,
    private queueAccessService: QueueAccessService,
    private repoUow: RepositoryUnitOfWork,
  ) {}

  async execute(params: NextPatientUseCaseParams) {
    const queue = await this.queueAccessService.getQueue(params.queueId);
    this.queueAccessService.ensureRunning(queue);

    const patient = await this.patientAccessService.getPatient(
      params.patientId,
    );
    this.patientAccessService.ensureInConsultation(patient);

    if (typeof params.resolved !== "boolean")
      throw new ValidationError({
        name: "ERR_INVALID_VALUE",
        message: "Value must be of type boolean",
        ctx: { expected: "true | false", recieved: params.resolved },
      });

    if (params.resolved) patient.setResolved();
    else patient.setWillBeReturning();

    const patientPosition =
      this.patientAccessService.getPositionFromPatient(patient);
    const nextPatient =
      await this.patientRepository.getNextPatientByPositionAfterPosition(
        queue.id,
        patientPosition,
      );

    if (nextPatient) nextPatient.setInConsultation();

    return await this.repoUow.atomic(async (ctx) => {
      const res = {
        [patient.id.value]: await this.patientRepository.save(patient, ctx),
      };
      if (nextPatient)
        res[nextPatient.id.value] = await this.patientRepository.save(
          nextPatient,
          ctx,
        );

      return res;
    });
  }
}
