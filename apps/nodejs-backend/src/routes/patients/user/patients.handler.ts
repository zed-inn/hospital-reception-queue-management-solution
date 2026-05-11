import { FastifyReply, FastifyRequest } from "fastify";
import { Reception } from "@config/core-app";
import { GetDetailsParams } from "./patients.schema";
import { toJsonPatient } from "@utils/to-json";

export class PatientHandler {
  static async getPatientDetails(
    req: FastifyRequest<{ Params: GetDetailsParams }>,
    reply: FastifyReply,
  ) {
    const params = req.params;

    const result = await Reception.getPatientDetail.execute(params);

    return reply
      .code(200)
      .send({
        patient: {
          ...toJsonPatient(result.patient),
          estimatedWaitTime: result.estimatedWaitTime,
        },
      });
  }
}
