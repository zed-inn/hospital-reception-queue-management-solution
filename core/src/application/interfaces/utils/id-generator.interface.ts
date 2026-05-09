export interface IdGenerator {
  generateAsync(): Promise<string>;
}
