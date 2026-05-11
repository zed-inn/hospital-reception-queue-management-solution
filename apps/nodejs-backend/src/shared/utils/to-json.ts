import { Patient } from "hospital-reception-system";
import z from "zod";

export function toJsonPatient(patient: Patient) {
  return {
    id: patient.id.value,
    queueId: patient.queueId.value,
    name: patient.name.value,
    phone: patient.phone.numberWithCountryCode,
    status: patient.status.value,
    position: patient.position?.value ?? null,
    tokenNumber: patient.tokenNumber.value,
    ticketedAt: patient.ticketedAt.value,
  };
}
