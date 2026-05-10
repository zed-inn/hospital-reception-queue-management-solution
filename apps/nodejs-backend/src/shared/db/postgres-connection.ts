import { Pool } from "pg";

export class PostgresConn {
  private readonly pool: Pool;

  constructor(params: { pgPool: Pool }) {
    this.pool = params.pgPool;

    Object.freeze(this);
  }

  private async checkConnection() {
    await this.pool.query("SELECT 1+1 AS RESULT;");
  }

  async connect() {
    await this.checkConnection();
  }

  async close() {
    await this.pool.end();
  }
}
