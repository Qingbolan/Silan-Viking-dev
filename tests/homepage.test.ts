import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage source keeps the ten-second promise and reference-style section entrances", async () => {
  const source = await readFile(new URL("../frontend/src/main.tsx", import.meta.url), "utf8");
  assert.match(source, /Silan Hu builds and studies AI systems/);
  assert.match(source, /Here I share what I tested/);
  assert.match(source, /this site is for process evidence/);
  assert.match(source, /Building AI Systems/);
  assert.match(source, /Reading Into Practice/);
});

test("project cards render an explicit author avatar instead of an icon-only owner marker", async () => {
  const source = await readFile(new URL("../frontend/src/main.tsx", import.meta.url), "utf8");
  const data = await readFile(new URL("../frontend/src/data.ts", import.meta.url), "utf8");
  const css = await readFile(new URL("../frontend/src/style.css", import.meta.url), "utf8");

  assert.equal(data.includes('avatarSrc: "/media/avatar.png"'), true);
  assert.match(source, /function ProjectAuthorBadge/);
  assert.match(source, /className="project-author-avatar"/);
  assert.match(css, /\.project-author-avatar/);
});
