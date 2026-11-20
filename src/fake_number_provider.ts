import { NumberProvider } from "./number_provider.ts";

export class FakeNumberProvider implements NumberProvider {
  private readonly files = new Map<string, Array<number>>();

  constructor(private path: string = "") {}

  public addFile(path: string, numbers: Array<number>): void {
    this.files.set(path, [...numbers]);
  }

  public async readNumbers(): Promise<Array<number>> {
    if (!this.files.has(this.path)) {
      throw new Error(`Fake file not found: ${this.path}`);
    }

    return [...this.files.get(this.path)!];
  }
}
