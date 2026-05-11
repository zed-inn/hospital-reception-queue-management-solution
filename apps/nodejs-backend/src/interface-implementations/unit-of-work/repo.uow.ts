import { RepositoryUnitOfWork } from "hospital-reception-system";
import { Pool } from "pg";

export class PostgresRepositoryUnitOfWork implements RepositoryUnitOfWork {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async atomic<T>(work: (ctx?: RepoUowCtx) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");
      const res = await work({ client });
      await client.query("COMMIT");
      return res;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
