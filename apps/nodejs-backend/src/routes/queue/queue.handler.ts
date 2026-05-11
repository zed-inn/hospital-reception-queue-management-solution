import { FastifyReply, FastifyRequest } from "fastify";
import { AddQueueDetailsBody } from "./queue.schema";
import { Reception } from "@config/core-app";

export class QueueHandler {
  static async addQueueDetails(
    req: FastifyRequest<{ Body: AddQueueDetailsBody }>,
    reply: FastifyReply,
  ) {
    const queue = req.user as AuthUserPayload;
    const body = req.body;

    const result = await Reception.addQueueDetails.execute({
      id: queue.id,
      name: body.name,
      type: body.type,
    });

    return reply.code(200);
  }

  static async pauseQueue(req: FastifyRequest, reply: FastifyReply) {
    const queue = req.user as AuthUserPayload;

    const result = await Reception.pauseQueue.execute({
      id: queue.id,
    });

    return reply.code(200);
  }

  static async resumeQueue(req: FastifyRequest, reply: FastifyReply) {
    const queue = req.user as AuthUserPayload;

    const result = await Reception.resumeQueue.execute({
      id: queue.id,
    });

    return reply.code(200);
  }
}
