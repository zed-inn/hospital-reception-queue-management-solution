import { PostgresRepositoryUnitOfWork } from "@implementations/unit-of-work/repo.uow";
import { UuidGenerator } from "@implementations/utils/id-generator";
import { Application } from "hospital-reception-system";
import db from "./postgres-db";
import { PostgresQueueAccountRepository } from "@implementations/repos/queue-account.repo";
import { PostgresQueueDetailsRepository } from "@implementations/repos/queue-details.repo";
import { PostgresPatientRepository } from "@implementations/repos/patient.repo";

const idGenerator = new UuidGenerator();
const repositoryUnitOfWork = new PostgresRepositoryUnitOfWork(db);
const queueAccountsRepository = new PostgresQueueAccountRepository(db);
const queueDetailsRepository = new PostgresQueueDetailsRepository(db);
const patientsRepository = new PostgresPatientRepository(db);

export const Reception = new Application(
  idGenerator,
  patientsRepository,
  queueAccountsRepository,
  queueDetailsRepository,
  repositoryUnitOfWork,
);
