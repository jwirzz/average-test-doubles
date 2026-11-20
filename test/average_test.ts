import { assertEquals } from "@std/assert";
import { Average } from "../src/average.ts";
import { FakeNumberProvider } from "../src/fake_number_provider.ts";
import { FixedNumberStub } from "../src/fixed_number_stub.ts";
import { ConfigurableNumberStub } from "../src/configurable_number_stub.ts";
import { FixedNumberMock } from "../src/fixed_number_mock.ts";
import { FileAccessSpy } from "../src/file_access_spy.ts";

Deno.test("computes median from a fake in-memory file", async () => {
  const fake = new FakeNumberProvider("C:\\test-data\\third-file.txt");
  fake.addFile("C:\\test-data\\third-file.txt", [7, 34, 2]);

  const average = new Average(fake);

  assertEquals(await average.computeMedianOfFile(), 7);
});

Deno.test("computes mean with a fixed stub", async () => {
  const average = new Average(new FixedNumberStub());

  assertEquals(await average.computeMeanOfFile(), 2);
});

Deno.test("computes mean with a configurable stub", async () => {
  const average = new Average(new ConfigurableNumberStub([1, 2, 3]));

  assertEquals(await average.computeMeanOfFile(), 2);
});

Deno.test("fixed mock records one read call", async () => {
  const mock = new FixedNumberMock();
  const average = new Average(mock);

  assertEquals(await average.computeMeanOfFile(), 2);
  assertEquals(mock.readCount, 1);
});

Deno.test("file access spy records the returned values and one read call", async () => {
  const directory = await Deno.makeTempDir();
  const path = `${directory}/numbers.txt`;
  await Deno.writeTextFile(path, "7\n34\n2\n");

  try {
    const spy = new FileAccessSpy(path);
    const average = new Average(spy);

    assertEquals(await average.computeMedianOfFile(), 7);
    assertEquals(spy.readCount, 1);
    assertEquals(spy.recordedValues, [7, 34, 2]);
  } finally {
    await Deno.remove(directory, { recursive: true });
  }
});

