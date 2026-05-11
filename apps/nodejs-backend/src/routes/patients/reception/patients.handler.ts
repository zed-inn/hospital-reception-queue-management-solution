import { FastifyReply, FastifyRequest } from "fastify";
import {
  AddNewPatientBody,
  AddNewPatientParams,
  AddReturningPatientParams,
  GetPatientsParams,
  GetPatientsQuery,
  NextPatientParams,
} from "./patients.schema";
import { Reception } from "@config/core-app";
import { toJsonPatient } from "@utils/to-json";
import { DateTime } from "luxon";
import { PatientRowCamel } from "@db/table-row-types";

export class PatientsHandler {
  static async getPatientsInQueue(
    req: FastifyRequest<{
      Querystring: GetPatientsQuery;
      Params: GetPatientsParams;
    }>,
    reply: FastifyReply,
  ) {
    const query = req.query,
      params = req.params;

    const result = await Reception.getPatientsInQueue.execute({
      queueId: params.queueId,
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
    req: FastifyRequest<{
      Params: AddNewPatientParams;
      Body: AddNewPatientBody;
    }>,
    reply: FastifyReply,
  ) {
    const params = req.params,
      body = req.body;

    const currentTimezoneOffsetedDate = DateTime.fromJSDate(new Date(), {
      zone: body.timeZone,
    }).toJSDate();
    const result = (await Reception.addNewPatient.execute({
      queueId: params.queueId,
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
    const params = req.params;

    const result = (await Reception.addReturningPatient.execute(
      params,
    )) as PatientRowCamel;

    return reply.code(200);
  }

  static async nextPatient(
    req: FastifyRequest<{ Params: NextPatientParams }>,
    reply: FastifyReply,
  ) {
    const params = req.params;

    const result = await Reception.nextPatient.execute({
      ...params,
      resolved: false,
    });

    return reply.code(200);
  }

  static async resolveAndNextPatient(
    req: FastifyRequest<{ Params: NextPatientParams }>,
    reply: FastifyReply,
  ) {
    const params = req.params;

    const result = await Reception.nextPatient.execute({
      ...params,
      resolved: true,
    });

    return reply.code(200);
  }
}
