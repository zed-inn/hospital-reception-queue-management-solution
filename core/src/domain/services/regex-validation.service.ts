export class RegexValidationService {
  static fullMatch(x: string, regex: RegExp) {
    const match = x.match(regex);
    if (!match || match.length <= 0 || match[0] !== x) return false;

    return true;
  }
}
