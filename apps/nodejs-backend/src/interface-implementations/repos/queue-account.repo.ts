import { PostgresRepository } from "@db/postgres-repo";
import { QueueAccountRow } from "@db/table-row-types";
import { QueueAccountRepository, QueueId } from "hospital-reception-system";

export class PostgresQueueAccountRepository
  extends PostgresRepository<QueueAccountRow>
  implements QueueAccountRepository
{
  async existsById(id: QueueId, ctx?: RepoUowCtx): Promise<boolean> {
    const result = await this.withCtx(ctx).query(
      "SELECT * FROM queue_accounts WHERE id = $1 RETURNING *",
      [id.value],
    );
    return result.rowCount !== 0;
  }
}
