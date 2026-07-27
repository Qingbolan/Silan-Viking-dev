export function GET() {
  return new Response(
    [
      "silan.dev is Silan Hu's public AI systems research workbench.",
      "silan.tech remains the canonical identity, CV, publications, formal milestones, and contact site.",
      "silan.dev owns process evidence: questions, reading trails, experiments, decisions, failures, revisions, and reusable artifacts.",
      "Public pages are projections from Silan Viking authored content and provenance, not a second content truth source.",
    ].join("\n") + "\n",
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
