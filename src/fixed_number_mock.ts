import { NumberProvider } from "./number_provider.ts";

export class FixedNumberMock implements NumberProvider {
  public readCount = 0;

  public async readNumbers(): Promise<Array<number>> {
    this.readCount++;
    return [1, 2, 3];
  }
}
