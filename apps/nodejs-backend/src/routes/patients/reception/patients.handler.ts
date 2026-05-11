import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddNewPatientBody,
  AddReturningPatientParams,
  GetPatientsQuery,
  NextPatientParams,
} from "./patients.schema";
import { Reception } from "@config/core-app";
import { toJsonPatient } from "@utils/to-json";
import { DateTime } from "luxon";
import { PatientRowCamel } from "@db/table-row-types";

export class PatientsHandler {
  static async getPatientsInQueue(
    req: FastifyRequest<{ Querystring: GetPatientsQuery }>,
    reply: FastifyReply,
  ) {
    const queue = req.user as AuthUserPayload;
    const query = req.query;

    const result = await Reception.getPatientsInQueue.execute({
      queueId: queue.id,
      ...(query.limit ? { limit: query.limit } : {}),
    });

    return reply.code(200).send({
      patients: result.map((p) => ({
        ...toJsonPatient(p.patient),
        estimatedTimeWaiting: p.estimatedWaitTime,
      })),
    });
  }

  static async addNewPatient(
    req: FastifyRequest<{ Body: AddNewPatientBody }>,
    reply: FastifyReply,
  ) {
    const queue = req.user as AuthUserPayload;
    const body = req.body;

    const currentTimezoneOffsetedDate = DateTime.fromJSDate(new Date(), {
      zone: body.timeZone,
    }).toJSDate();
    const result = (await Reception.addNewPatient.execute({
      queueId: queue.id,
      name: body.name,
      phone: body.phone,
      currentTimezoneOffsetedDate,
    })) as PatientRowCamel;

    return reply.code(200);
  }

  static async addReturningPatient(
    req: FastifyRequest<{ Params: AddReturningPatientParams }>,
    reply: FastifyReply,
  ) {
    const queue = req.user as AuthUserPayload;
    const params = req.params;

    const result = (await Reception.addReturningPatient.execute({
      queueId: queue.id,
      tokenNumber: params.tokenNumber,
    })) as PatientRowCamel;

    return reply.code(200);
  }

  static async nextPatient(
    req: FastifyRequest<{ Params: NextPatientParams }>,
    reply: FastifyReply,
  ) {
    const queue = req.user as AuthUserPayload;
    const params = req.params;

    const result = await Reception.nextPatient.execute({
      queueId: queue.id,
      patientId: params.patientId,
      resolved: false,
    });

    return reply.code(200);
  }

  static async resolveAndNextPatient(
    req: FastifyRequest<{ Params: NextPatientParams }>,
    reply: FastifyReply,
  ) {
    const queue = req.user as AuthUserPayload;
    const params = req.params;

    const result = await Reception.nextPatient.execute({
      queueId: queue.id,
      patientId: params.patientId,
      resolved: true,
    });

    return reply.code(200);
  }
}
