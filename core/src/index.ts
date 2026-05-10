import { PatientRepository } from "@interfaces/repos/patient-repo.interface";
import { QueueAccountRepository } from "@interfaces/repos/queue-account-repo.interface";
import { QueueDetailsRepository } from "@interfaces/repos/queue-details-repo.interface";
import { RepositoryUnitOfWork } from "@interfaces/unit-of-work/repo-uow.interface";
import { IdGenerator } from "@interfaces/utils/id-generator.interface";
import { PatientAccessService } from "@services/patient-access.service";
import { QueueAccessService } from "@services/queue-access.service";
import { AddNewPatientUseCase } from "@use-cases/patient/add-new-patient.use-case";
import { AddReturningPatientUseCase } from "@use-cases/patient/add-returning-patient.use-case";
import { GetPatientDetailUseCase } from "@use-cases/patient/get-patient-detail.use-case";
import { GetPatientInQueueUseCase } from "@use-cases/patient/get-patient-in-queue.use-case";
import { NextPatientUseCase } from "@use-cases/patient/next-patient.use-case";
import { AddQueueDetailsUseCase } from "@use-cases/queue/add-queue-details.use-case";
import { PauseQueueUseCase } from "@use-cases/queue/pause-queue.use-case";
import { ResumeQueueUseCase } from "@use-cases/queue/resume-queue.use-case";

export class Application {
  readonly addNewPatient: AddNewPatientUseCase;
  readonly addReturningPatient: AddReturningPatientUseCase;
  readonly getPatientDetail: GetPatientDetailUseCase;
  readonly getPatientsInQueue: GetPatientInQueueUseCase;
  readonly nextPatient: NextPatientUseCase;
  readonly addQueueDetails: AddQueueDetailsUseCase;
  readonly pauseQueue: PauseQueueUseCase;
  readonly resumeQueue: ResumeQueueUseCase;

  private readonly patientAccessService: PatientAccessService;
  private readonly queueAccessService: QueueAccessService;

  constructor(
    idGen: IdGenerator,
    patientRepository: PatientRepository,
    queueAccountRepository: QueueAccountRepository,
    queueDetailsRepository: QueueDetailsRepository,
    repositoryUnitOfWork: RepositoryUnitOfWork,
  ) {
    this.patientAccessService = new PatientAccessService(patientRepository);
    this.queueAccessService = new QueueAccessService(queueDetailsRepository);

    this.addNewPatient = new AddNewPatientUseCase(
      patientRepository,
      this.patientAccessService,
      this.queueAccessService,
      idGen,
    );

    this.addReturningPatient = new AddReturningPatientUseCase(
      patientRepository,
      this.patientAccessService,
      this.queueAccessService,
      repositoryUnitOfWork,
    );

    this.getPatientDetail = new GetPatientDetailUseCase(
      patientRepository,
      this.patientAccessService,
      this.queueAccessService,
    );

    this.getPatientsInQueue = new GetPatientInQueueUseCase(
      patientRepository,
      this.queueAccessService,
    );

    this.nextPatient = new NextPatientUseCase(
      patientRepository,
      this.patientAccessService,
      this.queueAccessService,
      repositoryUnitOfWork,
    );

    this.addQueueDetails = new AddQueueDetailsUseCase(
      queueAccountRepository,
      queueDetailsRepository,
    );

    this.pauseQueue = new PauseQueueUseCase(
      queueDetailsRepository,
      this.queueAccessService,
    );

    this.resumeQueue = new ResumeQueueUseCase(
      queueDetailsRepository,
      this.queueAccessService,
    );
  }
}
