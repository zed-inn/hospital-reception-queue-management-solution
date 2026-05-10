import { FastifyInstance } from "fastify";

export class Server {
  private readonly app: FastifyInstance;
  private readonly host: string;
  private readonly port: number;

  constructor(params: {
    fastifyApp: FastifyInstance;
    host: string;
    port: number;
  }) {
    this.app = params.fastifyApp;
    this.host = params.host;
    this.port = params.port;

    this.configureGracefulShutdown();
  }

  async gracefulShutdown(signal: string) {
    try {
      this.app.log.info(`${signal} received. Starting graceful shutdown...`);

      await this.app.close();
      this.app.log.info("Fastify application closed.");

      this.app.log.info("Shutdown successful.");
      process.exit(0);
    } catch (err) {
      console.log("Some error occured :", err);
      process.exit(1);
    }
  }

  async start() {
    try {
      await this.app.listen({ port: this.port, host: this.host });
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }

  configureGracefulShutdown() {
    process.on("SIGINT", () => this.gracefulShutdown("SIGINT"));

    process.on("SIGTERM", () => this.gracefulShutdown("SIGTERM"));

    process.on("SIGUSR2", async () => {
      await this.gracefulShutdown("SIGUSR2");
      process.kill(process.pid, "SIGUSR2");
    });

    process.on("unhandledRejection", async (err: Error) => {
      console.error("UNHANDLED REJECTION! Shutting down...");
      console.error(err);
      await this.gracefulShutdown("UNHANDLED_REJECTION");
      process.exit(1);
    });

    process.on("uncaughtException", async (err: Error) => {
      console.error("UNCAUGHT EXCEPTION! Shutting down...");
      console.error(err);
      await this.gracefulShutdown("UNCAUGHT_EXCEPTION");
      process.exit(1);
    });
  }
}
