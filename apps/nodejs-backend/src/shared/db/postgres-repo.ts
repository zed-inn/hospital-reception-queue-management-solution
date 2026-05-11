import { Pool, PoolClient } from "pg";

export class PostgresRepository<Row extends Record<string, unknown>> {
  protected readonly pool: Pool | PoolClient;

  constructor(pool: Pool | PoolClient) {
    this.pool = pool;
  }

  async query<T extends Row | Record<string, unknown> = Row>(
    queryText: string,
    values?: unknown[],
  ) {
    return await this.pool.query<T>(queryText, values);
  }

  withCtx(ctx?: RepoUowCtx) {
    const client = ctx?.client ?? this.pool;
    return new PostgresRepository<Row>(client);
  }
}
