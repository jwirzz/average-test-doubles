import { NumberProvider } from "./number_provider.ts";

export class FixedNumberStub implements NumberProvider {
  public async readNumbers(): Promise<Array<number>> {
    return [1, 2, 3];
  }
}
