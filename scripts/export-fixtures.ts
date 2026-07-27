import { mkdir, writeFile } from "node:fs/promises";
import {
  knowledgeAggregates,
  projectProfiles,
  siteProjections,
} from "../lib/silan-viking/fixtures";
import { getRouteMatrix } from "../lib/site/projection";

const snapshot = {
  exportedAt: "2026-07-21T00:00:00.000Z",
  source: "Silan Viking sanitized projection fixtures",
  knowledgeAggregates,
  projectProfiles,
  siteProjections,
  routeMatrix: getRouteMatrix(),
};

await mkdir("fixtures", { recursive: true });
await writeFile("fixtures/silan-dev-fixtures.json", `${JSON.stringify(snapshot, null, 2)}\n`);
