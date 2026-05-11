import { IdGenerator } from "hospital-reception-system";
import { v7 as uuidv7 } from "uuid";

export class UuidGenerator implements IdGenerator {
  async generateAsync(): Promise<string> {
    return uuidv7();
  }
}
