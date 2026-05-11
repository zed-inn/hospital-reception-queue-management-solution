import db from "@config/postgres-db";
import { QueueAccountRow, QueueAccountRowCamel } from "@db/table-row-types";
import { UuidGenerator } from "@implementations/utils/id-generator";

export class AuthService {
  private static toCamel(row: QueueAccountRow): QueueAccountRowCamel {
    return QueueAccountRow.parse({
      ...row,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    });
  }

  static async getByEmail(email: string, ctx?: RepoUowCtx) {
    const result = await db.query(
      "SELECT * FROM queue_accounts WHERE email = $1 RETURNING *",
      [email],
    );
    if (!result.rowCount) return null;

    return this.toCamel(result.rows[0] as QueueAccountRow);
  }

  static async create(
    params: { email: string; createdAt: Date },
    ctx?: RepoUowCtx,
  ) {
    const id = await new UuidGenerator().generateAsync();
    const result = await db.query(
      "INSERT INTO patient_accounts (id, email, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $3, null) RETURNING *",
      [id, params.email, params.createdAt],
    );
    return this.toCamel(result.rows[0] as QueueAccountRow);
  }
}
