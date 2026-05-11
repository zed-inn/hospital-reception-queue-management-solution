const routes: Record<string, (router: ZodFastifyInstance) => Promise<void>> =
  {};

const router = async (app: ZodFastifyInstance) => {
  for (const [prefix, route] of Object.entries(routes))
    app.register(route, { prefix });
};

export default router;
