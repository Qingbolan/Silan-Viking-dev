export type UnitKind =
  | "question"
  | "reading"
  | "experiment"
  | "decision"
  | "failure"
  | "synthesis"
  | "research_map";

export type SubjectRelationship =
  | "built"
  | "contributed"
  | "studied"
  | "collected"
  | "not_applicable";

export interface KnowledgeUnit {
  slug: string;
  sourceUri: string;
  revisionId: string;
  kind: UnitKind;
  title: string;
  summary: string;
  question: string;
  relationship: SubjectRelationship;
  role?: string;
  status: "source_checked" | "triangulated" | "unsupported";
  test: "planned" | "partial" | "reproduced" | "not_tested";
  route: string;
  canonicalOwner: "silan.dev" | "silan.tech";
  media?: {
    src: string;
    alt: string;
  };
  evidence: string[];
  limits: string[];
  action: string;
  voice: string;
}

export interface ProjectProfile {
  slug: string;
  title: string;
  summary: string;
  relationship: SubjectRelationship;
  role: string;
  route: string;
  year?: string;
  author?: ProjectAuthor;
  media?: {
    src: string;
    alt: string;
  };
}

export interface ProjectAuthor {
  name: string;
  avatarSrc: string;
}

export const silanAuthor: ProjectAuthor = {
  name: "Silan Hu",
  avatarSrc: "/media/avatar.png",
};

export const units: KnowledgeUnit[] = [
  {
    slug: "commercial-content-in-ai-answers",
    sourceUri: "silan://resources/blog/commercial-content-in-ai-answers",
    revisionId: "q-air-2026-07-21",
    kind: "question",
    title: "When can commercial content enter an AI answer without damaging the answer?",
    summary:
      "A live question about sponsored recommendations in generated answers, bounded by answer quality, delivery, and cost evidence.",
    question:
      "When can a generated answer include commercial content while preserving accuracy, naturalness, trust, and inspectable cost?",
    relationship: "not_applicable",
    status: "source_checked",
    test: "planned",
    route: "/units/commercial-content-in-ai-answers",
    canonicalOwner: "silan.dev",
    media: { src: "/media/gem-bench-map.png", alt: "AIR benchmark map" },
    evidence: [
      "GEM-Bench defines the AIR task and benchmark contract.",
      "The reviewed article separates offline answer generation from live ad-market outcomes.",
    ],
    limits: ["No online impressions, clicks, conversions, auctions, or long-term trust are measured."],
    action:
      "Run a two-method smoke test on product-specific queries before treating AIR as deployable.",
    voice:
      "The answer, not the ad sentence, is the object that must survive evaluation.",
  },
  {
    slug: "gem-bench-ai-answer-ad-screen",
    sourceUri: "silan://resources/blog/gem-bench-ai-answers-with-ads",
    revisionId: "read-gem-2026-07-21",
    kind: "reading",
    title: "GEM-Bench as an offline screen for ad-injected AI answers",
    summary:
      "The benchmark is useful as a bounded pre-deployment screen, not as evidence of live advertising success.",
    question: "What part of generative advertising can GEM-Bench support without overclaiming?",
    relationship: "contributed",
    role: "co-author and benchmark contributor",
    status: "triangulated",
    test: "partial",
    route: "/units/gem-bench-ai-answer-ad-screen",
    canonicalOwner: "silan.dev",
    media: { src: "/media/zurich-case.png", alt: "Zurich route example" },
    evidence: [
      "The paper reports task, datasets, baselines, qualitative metrics, and human-LLM agreement.",
      "Auction and incentive layers are separate from AIR answer generation.",
    ],
    limits: [
      "Human study checks ranking agreement for a limited comparison, not live ad behavior.",
      "CA-Prod click-like labels are not observed click-through rates.",
    ],
    action: "Convert the article's pre-deployment screen into a runnable two-method fixture.",
    voice:
      "The benchmark is most valuable when it rejects bad commercial insertions, not when it crowns a winner.",
  },
  {
    slug: "gem-bench-smoke-screen",
    sourceUri: "silan://resources/blog/gem-bench-smoke-screen",
    revisionId: "exp-gem-smoke-2026-07-21",
    kind: "experiment",
    title: "Five-minute GEM-Bench smoke screen",
    summary:
      "A fixture-based run checks schema, ad presence, token counts, and method comparison before any paid evaluation.",
    question: "What is the cheapest test that keeps AIR claims from becoming product claims?",
    relationship: "contributed",
    role: "benchmark user and article author",
    status: "source_checked",
    test: "partial",
    route: "/units/gem-bench-smoke-screen",
    canonicalOwner: "silan.dev",
    media: { src: "/media/research-public-site.png", alt: "Research public site snapshot" },
    evidence: [
      "The repository exposes validate, score, compare, and report commands.",
      "Fixture checks establish workflow shape before paid model calls.",
    ],
    limits: ["Fixture checks do not establish qualitative answer quality."],
    action: "Use the smoke fixture as the default preflight before paid evaluation.",
    voice:
      "The useful first test is not a leaderboard; it is a cheap way to catch a malformed claim.",
  },
  {
    slug: "research-update-workbench-map",
    sourceUri: "silan://resources/blog/research-update-workbench-map",
    revisionId: "map-research-update-2026-07-21",
    kind: "research_map",
    title: "Research update workbench map",
    summary:
      "A map that connects reading, tests, decisions, failures, and public revisions instead of publishing isolated notes.",
    question: "How should a public research site show what changed and why?",
    relationship: "built",
    role: "system designer",
    status: "source_checked",
    test: "planned",
    route: "/maps/research-update-workbench-map",
    canonicalOwner: "silan.dev",
    media: { src: "/media/update-dashboard.png", alt: "Research update dashboard" },
    evidence: [
      "Silan Viking keeps source identity, relations, proposals, and publication state separate.",
      "The site projection stores route and canonical ownership explicitly.",
    ],
    limits: ["The map is useful only when later decisions or corrections consume it."],
    action: "Use this map as the default structure for future reading-to-decision updates.",
    voice:
      "A research note becomes useful when the next person can see the decision it changed.",
  },
];

export const projects: ProjectProfile[] = [
  {
    slug: "silan-viking",
    title: "Silan Viking",
    summary:
      "A personal context system for authored content, proposal review, relation graphs, publication gates, and deployable site projections.",
    relationship: "built",
    role: "architect and implementer",
    route: "/work#silan-viking",
    year: "2026",
    author: silanAuthor,
    media: { src: "/media/silan-viking-dashboard.png", alt: "Silan Viking dashboard" },
  },
  {
    slug: "gem-bench",
    title: "GEM-Bench",
    summary:
      "Benchmark work for generative engine marketing and ad-injected AI answer evaluation.",
    relationship: "contributed",
    role: "co-author and benchmark contributor",
    route: "/work#gem-bench",
    year: "2026",
    author: silanAuthor,
    media: { src: "/media/gem-bench-map.png", alt: "GEM-Bench benchmark map" },
  },
  {
    slug: "llm-auction",
    title: "LLM-Auction",
    summary:
      "A collected paper trail for separating answer generation quality from auction and incentive mechanisms.",
    relationship: "studied",
    role: "reader",
    route: "/library#llm-auction",
    year: "2026",
    author: silanAuthor,
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Reading", href: "/reading" },
  { label: "Notes", href: "/notes" },
  { label: "Questions", href: "/questions" },
  { label: "Library", href: "/library" },
];

export const featuredUnits = units.slice(0, 3);
