import { assertEquals } from "@std/assert";
import { Average } from "../src/average.ts";
import { FakeNumberProvider } from "../src/fake_number_provider.ts";
import { FixedNumberStub } from "../src/fixed_number_stub.ts";
import { ConfigurableNumberStub } from "../src/configurable_number_stub.ts";

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

