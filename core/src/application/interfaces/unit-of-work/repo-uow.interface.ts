export interface RepoUowCtx {}

export interface RepositoryUnitOfWork {
  atomic<T>(work: (ctx?: RepoUowCtx) => Promise<T>): Promise<T>;
}
