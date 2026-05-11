import { PostgresRepository } from "@db/postgres-repo";
import { PatientRowMapper } from "@db/table-row-mapper";
import { PatientRow } from "@db/table-row-types";
import {
  Patient,
  PATIENT_TYPE,
  PatientId,
  PatientPosition,
  PatientRepository,
  PatientTokenNumber,
  QueueId,
} from "hospital-reception-system";

export class PostgresPatientRepository
  extends PostgresRepository<PatientRow>
  implements PatientRepository
{
  private toPatient(row: PatientRow) {
    return new Patient({
      id: row.id,
      queueId: row.queue_id,
      name: row.name,
      phone: { number: row.phone.number, countryCode: row.phone.country_code },
      status: PatientRowMapper.mapStatus(row.status) as any,
      type: PatientRowMapper.mapType(row.type) as any,
      position: row.position,
      tokenNumber: row.token_number,
      ticketedAt: row.created_at,
    });
  }

  private toRow(patient: Patient, updatedAt?: Date): PatientRow {
    return {
      id: patient.id.value,
      queue_id: patient.queueId.value,
      name: patient.name.value,
      phone: {
        number: patient.phone.number,
        country_code: patient.phone.value.countryCode.value,
      },
      status: PatientRowMapper.mapStatus(patient.status.value) as number,
      type: PatientRowMapper.mapType(patient.type.value) as number,
      position: patient.position?.value ?? null,
      token_number: patient.tokenNumber.value,
      created_at: patient.ticketedAt.value,
      updated_at: updatedAt ?? patient.ticketedAt.value,
      deleted_at: null,
    };
  }

  async existsById(id: PatientId, ctx?: RepoUowCtx): Promise<boolean> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rowCount !== 0;
  }

  async getById(id: PatientId, ctx?: RepoUowCtx): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE id = $1 RETURNING *",
      [id.value],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async getByTokenNumber(
    qId: QueueId,
    tokenNum: PatientTokenNumber,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE queue_id = $1 AND token_number = $2 RETURNING *",
      [qId.value, tokenNum.value],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async countPositionBeforePosition(
    qId: QueueId,
    position: PatientPosition,
    ctx?: RepoUowCtx,
  ): Promise<number> {
    const result = await this.withCtx(ctx).query<{ count: number }>(
      "SELECT COUNT(*) FILTER (WHERE queue_id = $1 AND position < $2) AS count FROM patients",
      [qId.value, position.value],
    );

    return result.rows[0]?.count as number;
  }

  async getLastByPositionInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE position IS NOT NULL AND queue_id = $1 ORDER BY position DESC LIMIT 1",
      [qId.value],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async getLastInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE queue_id = $1 ORDER BY created_at DESC LIMIT 1",
      [qId.value],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async getLastReturningByPositionInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE position IS NOT NULL AND queue_id = $1 AND type = $2 ORDER BY created_at DESC LIMIT 1",
      [qId.value, PatientRowMapper.mapType(PATIENT_TYPE.RETURNING)],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async getNext2PatientsByPositionAfterPositionInQueue(
    qId: QueueId,
    position: PatientPosition,
    ctx?: RepoUowCtx,
  ): Promise<[Patient, Patient | null] | [null, null]> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE position IS NOT NULL AND queue_id = $1 AND position > $2 ORDER BY position ASC LIMIT 2",
      [qId.value, position.value],
    );
    if (result.rowCount === 0) return [null, null];

    const patients = result.rows.map(this.toPatient);
    if (result.rowCount === 1) return [patients[0] as Patient, null];

    return patients as [Patient, Patient];
  }

  async getNextPatientByPositionAfterPosition(
    qId: QueueId,
    position: PatientPosition,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE position IS NOT NULL AND queue_id = $1 AND position > $2 ORDER BY position ASC LIMIT 1",
      [qId.value, position.value],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async getPositioned(
    qId: QueueId,
    limit: number,
    ctx?: RepoUowCtx,
  ): Promise<Patient[]> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE position IS NOT NULL AND queue_id = $1 ORDER BY position ASC LIMIT $2",
      [qId.value, limit],
    );

    return result.rows.map(this.toPatient);
  }

  async getTopByPositionInQueue(
    qId: QueueId,
    ctx?: RepoUowCtx,
  ): Promise<Patient | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM patients WHERE position IS NOT NULL AND queue_id = $1 ORDER BY position ASC LIMIT 1",
      [qId.value],
    );
    if (!result.rowCount) return null;

    return this.toPatient(result.rows[0] as PatientRow);
  }

  async save(patient: Patient, ctx?: RepoUowCtx) {
    const exist = await this.existsById(patient.id, ctx);
    const row = this.toRow(patient, ctx?.updatedAt ?? new Date());

    if (!exist) {
      const result = await this.withCtx(ctx).query(
        "INSERT INTO patients (id, queue_id, name, phone, status, type, position, token_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) RETURNING *",
        [
          row.id,
          row.queue_id,
          row.name,
          row.phone,
          row.status,
          row.type,
          row.position,
          row.token_number,
          row.created_at,
          row.updated_at,
        ],
      );

      return result.rows[0] as PatientRow;
    } else {
      const result = await this.withCtx(ctx).query(
        "UPDATE patients SET queue_id = $1, name = $2, phone = $3, status = $4, type = $5, position = $6, token_number = $7, created_at = $8, updated_at = $9, deleted_at = $10 WHERE id = $10 RETURNING *",
        [
          row.queue_id,
          row.name,
          row.phone,
          row.status,
          row.type,
          row.position,
          row.token_number,
          row.created_at,
          row.updated_at,
          row.deleted_at,
          row.id,
        ],
      );

      return result.rows[0] as PatientRow;
    }
  }
}
