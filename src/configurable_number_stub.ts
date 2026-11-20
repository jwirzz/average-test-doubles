import { NumberProvider } from "./number_provider.ts";

export class ConfigurableNumberStub implements NumberProvider {
  constructor(private readonly numbers: Array<number>) {}

  public async readNumbers(): Promise<Array<number>> {
    return [...this.numbers];
  }
}
