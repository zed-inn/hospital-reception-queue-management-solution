import { PoolClient } from "pg";
import type { RepoUowCtx } from "hospital-reception-system";

declare global {
  interface RepoUowCtx {
    client?: PoolClient;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
