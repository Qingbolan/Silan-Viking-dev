import { getPublicAggregates, silanDevProfile } from "../../lib/site/projection";

export function GET() {
  const lines = [
    "# Silan.dev",
    "",
    "Silan Hu builds and studies AI systems. This site exposes questions, evidence, experiments, decisions, failures, and revisions.",
    "",
    "Canonical person identity: https://silan.tech/#person",
    "",
    "Indexable evidence pages:",
    ...getPublicAggregates().map((aggregate) => {
      const item = aggregate.unit;
      const route =
        item.developmentState === "synthesized" && item.kind === "research_map"
          ? `/maps/${"slug" in item ? item.slug : ""}`
          : `/units/${"slug" in item ? item.slug : ""}`;
      return `- ${"title" in item ? item.title : item.sourceUri}: ${silanDevProfile.publicOrigin}${route}`;
    }),
  ];
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
