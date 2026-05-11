import {
  PATIENT_STATUS,
  PATIENT_TYPE,
  QUEUE_STATUS,
  QUEUE_TYPE,
} from "hospital-reception-system";
import z from "zod";

export type PatientRow = {
  id: string;
  queue_id: string;
  name: string;
  phone: { number: string; country_code: number };
  status: number;
  type: number;
  position: string | null;
  token_number: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export const PatientRow = z.object({
  id: z.uuidv7(),
  queueId: z.uuidv7(),
  name: z.string(),
  phone: z.object({ number: z.string(), countryCode: z.string() }),
  status: z.int().min(1).max(Object.values(PATIENT_STATUS).length),
  type: z.int().min(1).max(Object.values(PATIENT_TYPE).length),
  position: z.string().nullable(),
  tokenNumber: z.int().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type PatientRowCamel = z.infer<typeof PatientRow>;

export type QueueDetailRow = {
  id: string;
  name: string;
  type: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export const QueueDetailRow = z.object({
  id: z.uuidv7(),
  name: z.string(),
  type: z.int().min(1).max(Object.values(QUEUE_TYPE).length),
  status: z.int().min(1).max(Object.values(QUEUE_STATUS).length),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type QueueDetailRowCamel = z.infer<typeof QueueDetailRow>;

export type QueueAccountRow = {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export const QueueAccountRow = z.object({
  id: z.uuidv7(),
  email: z.email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type QueueAccountRowCamel = z.infer<typeof QueueAccountRow>;
