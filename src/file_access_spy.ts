import { FileAccess } from "./file_access.ts";
import { NumberProvider } from "./number_provider.ts";

export class FileAccessSpy implements NumberProvider {
  private readonly fileAccess: FileAccess;
  public readCount = 0;
  public readonly recordedValues: Array<number> = [];

  constructor(path: string) {
    this.fileAccess = new FileAccess(path);
  }

  public async readNumbers(): Promise<Array<number>> {
    this.readCount++;
    const numbers = await this.fileAccess.readNumbers();
    this.recordedValues.push(...numbers);
    return numbers;
  }
}
