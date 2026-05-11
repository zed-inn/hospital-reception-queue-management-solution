import { PostgresRepository } from "@db/postgres-repo";
import { QueueRowMapper } from "@db/table-row-mapper";
import { QueueDetailRow } from "@db/table-row-types";
import {
  Queue,
  QueueDetailsRepository,
  QueueId,
} from "hospital-reception-system";

export class PostgresQueueDetailsRepository
  extends PostgresRepository<QueueDetailRow>
  implements QueueDetailsRepository
{
  private toQueue(row: QueueDetailRow) {
    return new Queue({
      id: row.id,
      name: row.name,
      type: QueueRowMapper.mapType(row.type) as any,
      status: QueueRowMapper.mapStatus(row.status) as any,
    });
  }

  private toRow(
    queue: Queue,
    createdAt: Date,
    updatedAt?: Date,
  ): QueueDetailRow {
    return {
      id: queue.id.value,
      name: queue.name.value,
      type: QueueRowMapper.mapType(queue.type.value) as number,
      status: QueueRowMapper.mapStatus(queue.status.value) as number,
      created_at: createdAt,
      updated_at: updatedAt ?? createdAt,
      deleted_at: null,
    };
  }

  async existsById(id: QueueId, ctx?: RepoUowCtx): Promise<boolean> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM queue_accounts WHERE id = $1 RETURNING *",
      [id.value],
    );
    return result.rowCount !== 0;
  }

  async getById(id: QueueId, ctx?: RepoUowCtx): Promise<Queue | null> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM queue_accounts WHERE id = $1 RETURNING *",
      [id.value],
    );
    if (!result.rowCount) return null;

    return this.toQueue(result.rows[0] as QueueDetailRow);
  }

  async save(q: Queue, ctx?: RepoUowCtx) {
    const exists = await this.existsById(q.id, ctx);
    const row = this.toRow(q, ctx?.createdAt ?? new Date(), ctx?.updatedAt);

    if (!exists) {
      const result = await this.withCtx(ctx).query(
        "INSERT INTO queue_details (id, name, type, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          row.id,
          row.name,
          row.type,
          row.status,
          row.created_at,
          row.updated_at,
        ],
      );

      return this.toQueue(result.rows[0] as QueueDetailRow);
    } else {
      const result = await this.withCtx(ctx).query(
        "UPDATE queue_details SET name = $1, type = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *",
        [row.name, row.type, row.status, row.updated_at, row.id],
      );

      return this.toQueue(result.rows[0] as QueueDetailRow);
    }
  }
}
