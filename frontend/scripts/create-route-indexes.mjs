import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const routes = [
  "work",
  "reading",
  "notes",
  "library",
  "questions",
  "units/commercial-content-in-ai-answers",
  "units/gem-bench-ai-answer-ad-screen",
  "units/gem-bench-smoke-screen",
  "maps/research-update-workbench-map",
];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(join(dist, "index.html"), join(dir, "index.html"));
}
