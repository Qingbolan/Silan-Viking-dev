import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage source keeps the ten-second promise and three task entrances", async () => {
  const source = await readFile(new URL("../frontend/src/main.tsx", import.meta.url), "utf8");
  assert.match(source, /Silan Hu builds and studies AI systems/);
  assert.match(source, /Here I share what I tested/);
  assert.match(source, /See what I am testing/);
  assert.match(source, /Start with a project/);
  assert.match(source, /Follow a paper into practice/);
});
