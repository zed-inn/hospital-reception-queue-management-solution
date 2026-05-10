import { ValidationError } from "@errors/validation.error";

export class WaitingTimeService {
  private static readonly averageWaitingTimeMs = 7 * 60 * 1000; // 5 minutes
  private static readonly bufferTimeEachPatientMs = 3 * 60 * 1000; // 3 minutes
  private static readonly waitTimePerPatientMs =
    this.averageWaitingTimeMs + this.bufferTimeEachPatientMs;
  private static readonly bufferTimeOverallMs = 5 * 60 * 1000; // 5 minutes

  static getEstimatedWaitTime(peopleBefore: number) {
    if (!Number.isInteger(peopleBefore) || peopleBefore < 0)
      throw new ValidationError({
        name: "ERR_INVALID_TYPE",
        message: "Value must be a positive integer",
        ctx: { expected: "Int(>0)", recieved: peopleBefore },
      });

    const rawWaitTime =
      peopleBefore * this.waitTimePerPatientMs + this.bufferTimeOverallMs;

    return this.convertRawWaitTimeToRange(rawWaitTime);
  }

  private static convertRawWaitTimeToRange(waitTime: number) {
    return { min: waitTime - 3 * 60 * 1000, max: waitTime + 20 * 60 * 1000 };
  }
}
