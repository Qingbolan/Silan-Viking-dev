import type {
  ConsumptionEvent,
  KnowledgeAggregate,
  KnowledgePayload,
  ProjectSubjectProfile,
  SiteProfile,
  SiteProjection,
  SynthesizedUnit,
} from "./contracts";

const reviewedAt = "2026-07-21";

const routePolicy = {
  ownedWorkPrefix: "/work",
  readingPrefix: "/reading",
  notesPrefix: "/notes",
  libraryPrefix: "/library",
  questionsPrefix: "/questions",
  mapsPrefix: "/maps",
  unitPrefix: "/units",
} as const;

export const siteProfiles: SiteProfile[] = [
  {
    id: "silan-tech",
    domain: "silan.tech",
    publicOrigin: "https://silan.tech",
    title: "Silan Hu",
    description: "Canonical identity, CV, publications, formal milestones, and contact.",
    audience: ["collaborator", "founder", "search_system"],
    routePolicy,
    contentPolicy: {
      includeKnowledgeKinds: [],
      workRelationships: ["built", "contributed"],
      libraryRelationships: [],
      requirePublicGate: true,
      requireFeatureVoice: false,
    },
    seoPolicy: {
      personCanonicalId: "https://silan.tech/#person",
      allowIndependentProcessPages: false,
      noIndexLibraryReferences: true,
    },
    deployTarget: { id: "silan-tech-production", domain: "silan.tech" },
  },
  {
    id: "silan-dev",
    domain: "silan.dev",
    publicOrigin: "https://silan.dev",
    title: "Silan.dev",
    description:
      "Silan Hu's public AI systems research workbench: questions, evidence, experiments, decisions, failures, and revisions.",
    audience: [
      "researcher",
      "senior_engineer",
      "collaborator",
      "founder",
      "student",
      "search_system",
    ],
    routePolicy,
    contentPolicy: {
      includeKnowledgeKinds: [
        "question",
        "reading",
        "decision",
        "experiment",
        "failure",
        "synthesis",
        "research_map",
      ],
      workRelationships: ["built", "contributed"],
      libraryRelationships: ["studied", "collected"],
      requirePublicGate: true,
      requireFeatureVoice: true,
    },
    seoPolicy: {
      personCanonicalId: "https://silan.tech/#person",
      allowIndependentProcessPages: true,
      noIndexLibraryReferences: true,
    },
    deployTarget: { id: "silan-dev-production", domain: "silan.dev" },
  },
];

function unit<P extends KnowledgePayload>(
  input: Omit<
    SynthesizedUnit<P>,
    | "developmentState"
    | "sourceVisibility"
    | "validityState"
    | "revisitGraceDays"
    | "revisitHistory"
    | "modifiedAt"
  >,
): SynthesizedUnit<P> {
  return {
    ...input,
    developmentState: "synthesized",
    sourceVisibility: "public",
    validityState: "current",
    revisitGraceDays: 14,
    revisitHistory: [],
    modifiedAt: "2026-07-21",
  };
}

export const knowledgeAggregates: KnowledgeAggregate[] = [
  {
    unit: unit({
      kind: "question",
      slug: "commercial-content-in-ai-answers",
      title: "When can commercial content enter an AI answer without damaging the answer?",
      summary:
        "A live question about sponsored recommendations in generated answers, bounded by answer quality, delivery, and cost evidence.",
      sourceUri: "silan://resources/blog/commercial-content-in-ai-answers",
      revisionId: "q-air-2026-07-21",
      subjectRelationship: "not_applicable",
      publishedAt: "2026-07-21",
      revisitAt: "2026-09-01",
      question:
        "When can a generated answer include commercial content while preserving accuracy, naturalness, trust, and inspectable cost?",
      position: {
        type: "open_question",
        positionId: "pos-air-question",
        uncertainty:
          "Offline benchmark evidence exists, but live incentives, disclosure, and long-term trust remain untested.",
        currentUnderstanding: "The answer, not the ad sentence, must be the evaluation object.",
        confidence: "medium",
      },
      evidence: [
        evidence("ev-gem-paper", "paper", "https://arxiv.org/abs/2509.14221", "GEM-Bench paper", "supports", "Defines the AIR task and benchmark contract."),
        evidence("ev-gem-limits", "observation", "silan://resources/blog/gem-bench-ai-answers-with-ads", "Silan reviewed article", "limits", "Separates offline answer generation from live ad-market outcomes."),
      ],
      sourceStatus: "source_checked",
      testStatus: "planned",
      artifacts: [{ uri: "https://github.com/Generative-Engine-Marketing/GEM-Bench", kind: "code", revision: "public-main" }],
      relations: [
        relation("related", "pos-gem-reading-claim"),
        relation("tests", "silan://resources/blog/gem-bench-smoke-screen"),
      ],
      limitations: ["No online impressions, clicks, conversions, auctions, or long-term trust are measured."],
      action: {
        actionId: "act-air-next",
        description: "Run a two-method smoke test on product-specific queries before treating AIR as deployable.",
        status: "planned",
        createdAt: "2026-07-21",
      },
      whyNow:
        "This is the clearest current example of turning an AI systems paper into a reusable pre-deployment decision.",
      payload: {
        kind: "question",
        whyItMatters:
          "Sponsored answers are likely to appear in search and assistants, but product teams need a way to reject damaging insertions before launch.",
        missingEvidence: "Disclosure effects, live marketplace incentives, and repeated-user trust.",
      },
      media: { src: "/media/gem-bench-map.png", alt: "AIR benchmark map.", tone: "diagram" },
    }),
    consumptionEvents: [
      consumption("consume-air-question-to-smoke", "silan://resources/blog/commercial-content-in-ai-answers", "q-air-2026-07-21", "silan://resources/blog/gem-bench-smoke-screen", "exp-gem-smoke-2026-07-21", "test", "Question shaped the smoke-test comparator and failure condition."),
    ],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "reading",
      slug: "gem-bench-ai-answer-ad-screen",
      title: "GEM-Bench as an offline screen for ad-injected AI answers",
      summary:
        "The benchmark is useful as a bounded pre-deployment screen, not as evidence of live advertising success.",
      sourceUri: "silan://resources/blog/gem-bench-ai-answers-with-ads",
      revisionId: "read-gem-2026-07-21",
      subjectRelationship: "contributed",
      role: "co-author and benchmark contributor",
      publishedAt: "2026-07-21",
      revisitAt: "2026-08-20",
      question: "What part of generative advertising can GEM-Bench support without overclaiming?",
      position: {
        type: "claim",
        positionId: "pos-gem-reading-claim",
        claim: "GEM-Bench supports offline AIR method comparison and pre-deployment rejection decisions.",
        judgment: "Use it to find answer-quality damage and cost tradeoffs; do not use it as click or market evidence.",
        confidence: "high",
      },
      evidence: [
        evidence("ev-gem-paper-main", "paper", "https://arxiv.org/abs/2509.14221", "GEM-Bench paper", "supports", "Reports task, datasets, baselines, qualitative metrics, and human-LLM agreement."),
        evidence("ev-llm-auction", "paper", "https://arxiv.org/html/2512.10551v1", "LLM-Auction paper", "limits", "Shows auction and incentive layers are separate from AIR generation."),
      ],
      sourceStatus: "triangulated",
      testStatus: "partial",
      artifacts: [
        {
          uri: "https://github.com/Generative-Engine-Marketing/GEM-Bench",
          kind: "code",
          revision: "public-main",
          environment: "Python CLI smoke fixtures",
          observedAt: "2026-07-20",
        },
      ],
      relations: [relation("supports", "pos-air-question"), relation("tests", "silan://resources/blog/gem-bench-smoke-screen")],
      limitations: [
        "Human study checks ranking agreement for a limited comparison, not live ad behavior.",
        "CA-Prod click-like labels are not observed click-through rates.",
      ],
      action: {
        actionId: "act-gem-transfer",
        description: "Convert the article's pre-deployment screen into a runnable two-method fixture.",
        status: "completed",
        createdAt: "2026-07-20",
        completedAt: "2026-07-21",
        outcome: "Produced the smoke-screen experiment fixture and decision chain.",
        consumerUri: "silan://resources/blog/gem-bench-smoke-screen",
      },
      surprise:
        "The benchmark is most valuable when it rejects bad commercial insertions, not when it crowns a winner.",
      payload: {
        kind: "reading",
        priorExpectation: "A benchmark for ads in AI answers might collapse into a leaderboard.",
        accepted: "Separate answer quality, ad delivery, and cost; inspect cases where insertion damages the answer.",
        rejected: "Treating predicted clicks or small qualitative scores as live market evidence.",
        transferPlan: "Use the checked-in GEM-Bench fixtures before running paid model calls.",
      },
      media: { src: "/media/zurich-case.png", alt: "Zurich route example comparing damaged and preserved answers.", tone: "evidence" },
    }),
    consumptionEvents: [
      consumption("consume-gem-to-smoke", "silan://resources/blog/gem-bench-ai-answers-with-ads", "read-gem-2026-07-21", "silan://resources/blog/gem-bench-smoke-screen", "exp-gem-smoke-2026-07-21", "test", "Defined validate -> score -> compare as the reusable smoke path."),
    ],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "experiment",
      slug: "gem-bench-smoke-screen",
      title: "Five-minute GEM-Bench smoke screen",
      summary:
        "A fixture-based run checks schema, ad presence, token counts, and method comparison before any paid evaluation.",
      sourceUri: "silan://resources/blog/gem-bench-smoke-screen",
      revisionId: "exp-gem-smoke-2026-07-21",
      subjectRelationship: "contributed",
      role: "benchmark user and article author",
      publishedAt: "2026-07-21",
      revisitAt: "2026-08-15",
      question: "What is the cheapest test that keeps AIR claims from becoming product claims?",
      position: {
        type: "claim",
        positionId: "pos-gem-smoke-claim",
        claim: "A no-API fixture run can verify file shape and comparative workflow before live model spending.",
        judgment: "Use it as a guardrail for method setup, not for answer trust or accuracy.",
        confidence: "medium",
      },
      evidence: [
        evidence("ev-gem-repo", "code", "https://github.com/Generative-Engine-Marketing/GEM-Bench", "GEM-Bench repository", "supports", "Repository exposes validate, score, compare, and report commands."),
        evidence("ev-smoke-limit", "observation", "silan://resources/blog/gem-bench-ai-answers-with-ads", "Silan reviewed article", "limits", "Fixture checks do not establish qualitative answer quality."),
      ],
      sourceStatus: "source_checked",
      testStatus: "partial",
      artifacts: [
        {
          uri: "gembench ads validate examples/production/ads.json",
          kind: "procedure",
          revision: "fixture-command",
          environment: "Python venv, public repository fixtures",
          observedAt: "2026-07-21",
        },
      ],
      relations: [relation("tests", "pos-gem-reading-claim"), relation("informs", "silan://resources/blog/choose-staged-ad-injection")],
      limitations: ["Does not make a live request and cannot validate answer naturalness or trust."],
      action: {
        actionId: "act-gem-decision",
        description: "Use smoke result to choose whether a full AIR comparison is warranted.",
        status: "completed",
        createdAt: "2026-07-21",
        completedAt: "2026-07-21",
        outcome: "Decision record keeps smoke test as a setup gate before paid runs.",
        consumerUri: "silan://resources/blog/choose-staged-ad-injection",
      },
      whyNow:
        "This makes the article reusable by another engineer without asking them to buy model calls first.",
      payload: {
        kind: "experiment",
        expected: "Fixture scoring can compare existing output files and expose token/cost fields.",
        comparator: "ad-chat fixture versus rag-adchat fixture",
        environment: "Python venv with checked-in GEM-Bench examples",
        observed: "The smoke test verifies shape and accounting, while leaving answer quality unresolved.",
        failureCondition: "If schema or compare commands require prose interpretation, the Phase 0.5 model gate fails.",
      },
      media: { src: "/media/gem-bench-map.png", alt: "Benchmark workflow map.", tone: "diagram" },
    }),
    consumptionEvents: [
      consumption("consume-smoke-to-decision", "silan://resources/blog/gem-bench-smoke-screen", "exp-gem-smoke-2026-07-21", "silan://resources/blog/choose-staged-ad-injection", "decision-air-2026-07-21", "decision", "Decision requires fixture pass before any model-paid AIR evaluation."),
    ],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "decision",
      slug: "choose-staged-ad-injection",
      title: "Choose staged retrieval-and-rewrite before any sponsored-answer pilot",
      summary: "A decision record: direct prompt insertion is too easy to ship without seeing damaged answers.",
      sourceUri: "silan://resources/blog/choose-staged-ad-injection",
      revisionId: "decision-air-2026-07-21",
      subjectRelationship: "contributed",
      role: "benchmark contributor and technical decision owner",
      publishedAt: "2026-07-21",
      revisitAt: "2026-09-15",
      question: "Which AIR workflow should be considered first if a product team asks for a sponsored-answer pilot?",
      position: {
        type: "claim",
        positionId: "pos-air-decision",
        claim: "Start with staged retrieval-and-rewrite and reject direct insertion when it damages the answer.",
        judgment: "Method choice must be surface-specific and bounded by answer damage, not only delivery rate.",
        confidence: "medium",
      },
      evidence: [
        evidence("ev-gir-tradeoff", "paper", "https://arxiv.org/abs/2509.14221", "GEM-Bench paper", "supports", "Reports tradeoffs among Ad-Chat, GI-R, GIR-R, and GIR-P."),
        evidence("ev-route-counterexample", "observation", "silan://resources/blog/megabus-route-failure", "Silan failure fixture", "limits", "Megabus route example shows a plausible paid insertion can break the user answer."),
      ],
      sourceStatus: "source_checked",
      testStatus: "planned",
      artifacts: [{ uri: "silan://resources/blog/gem-bench-smoke-screen", kind: "procedure", revision: "exp-gem-smoke-2026-07-21", environment: "No-API fixture smoke screen", observedAt: "2026-07-21" }],
      relations: [relation("informs", "silan://resources/projects/gem-bench"), relation("limits", "silan://resources/blog/megabus-route-failure")],
      limitations: ["This is a pre-deployment engineering rule; it is not an auction, policy, or revenue decision."],
      action: {
        actionId: "act-air-pilot",
        description: "Require a question-specific compare report before any pilot claim.",
        status: "planned",
        createdAt: "2026-07-21",
      },
      surprise:
        "The useful decision is not which workflow wins globally, but which examples should stop the pilot.",
      payload: {
        kind: "decision",
        context: "A product team wants sponsored recommendations inside generated answers.",
        alternatives: ["Direct prompt insertion", "Retrieve then inject", "Retrieve then rewrite and compare answer damage"],
        decisionRule: "Do not continue if insertion changes the factual answer or hides the limitation.",
        chosenAction: "Start with staged retrieval-and-rewrite plus fixture and paid compare reports.",
        observedResult: "Fixture gate prevents setup mistakes; qualitative claims still require judged outputs.",
        transferCondition: "Only transfer where query eligibility and disclosure are separately handled.",
      },
      media: { src: "/media/zurich-case.png", alt: "Commercial drift in a local-route answer.", tone: "evidence" },
    }),
    consumptionEvents: [],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "failure",
      slug: "megabus-route-failure",
      title: "Megabus in a Zurich local-route answer is a negative result",
      summary: "A failure fixture preserving expected answer, observed promotional drift, eliminated explanations, and next test.",
      sourceUri: "silan://resources/blog/megabus-route-failure",
      revisionId: "failure-megabus-2026-07-21",
      subjectRelationship: "studied",
      publishedAt: "2026-07-21",
      revisitAt: "2026-08-01",
      question: "What failure proves that ad delivery can damage the answer itself?",
      position: {
        type: "claim",
        positionId: "pos-megabus-failure",
        claim: "A direct ad-prompt baseline can preserve promotion while failing the route-answer task.",
        judgment: "Retain this as a guardrail example for AIR evaluation.",
        confidence: "high",
      },
      evidence: [
        evidence("ev-zurich-case", "observation", "silan://resources/blog/gem-bench-ai-answers-with-ads/assets/zurich-case-en.png", "GEM-Bench article figure", "supports", "Side-by-side output shows Megabus pitch replacing useful route guidance."),
        evidence("ev-zurich-limit", "paper", "https://arxiv.org/abs/2509.14221", "GEM-Bench paper", "limits", "The example is a qualitative failure, not a live transport study."),
      ],
      sourceStatus: "source_checked",
      testStatus: "failed",
      artifacts: [{ uri: "silan://resources/blog/gem-bench-ai-answers-with-ads/assets/zurich-case-en.png", kind: "figure", revision: "read-gem-2026-07-21", environment: "Paper example reproduced in article", observedAt: "2026-07-20" }],
      relations: [relation("contradicts", "pos-air-decision"), relation("limits", "pos-air-question")],
      limitations: ["The failure shows task damage in one route case; it does not estimate frequency across domains."],
      action: {
        actionId: "act-megabus-next",
        description: "Keep as a rejection fixture for public-card and decision tests.",
        status: "completed",
        createdAt: "2026-07-21",
        completedAt: "2026-07-21",
        outcome: "Fixture blocks treating ad delivery as answer success.",
      },
      whyNow:
        "This is the negative example that keeps the site from sounding like a benchmark press release.",
      payload: {
        kind: "failure",
        expected: "Answer should give local public-transport directions from Zurich Main Station to Sihlcity.",
        observed: "The direct baseline moved into a Megabus pitch even though Megabus does not serve the local route.",
        environment: "GEM-Bench qualitative example reproduced from paper outputs",
        eliminatedCauses: ["The user query was not asking for intercity coach travel.", "The failure is not only a style issue; route correctness changes."],
        remainingExplanations: ["Prompt pressure from paid recommendation can override answer utility.", "Retrieval without answer-level evaluation is insufficient."],
      },
      media: { src: "/media/zurich-case.png", alt: "Failed local-route answer.", tone: "evidence" },
    }),
    consumptionEvents: [
      consumption("consume-failure-to-decision", "silan://resources/blog/megabus-route-failure", "failure-megabus-2026-07-21", "silan://resources/blog/choose-staged-ad-injection", "decision-air-2026-07-21", "decision", "Decision rule requires answer-damage examples before method selection."),
    ],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "reading",
      slug: "research-update-lifecycle",
      title: "Research updates need a lifecycle, not another page builder",
      summary: "Silan Viking is framed as capture, structure, propose, publish, and observe with owner-controlled transitions.",
      sourceUri: "silan://resources/blog/make-research-work-findable",
      revisionId: "read-update-loop-2026-07-21",
      subjectRelationship: "built",
      role: "author and system builder",
      publishedAt: "2026-07-21",
      revisitAt: "2026-08-20",
      question: "What boundary makes research website updates cheap without weakening authorship?",
      position: {
        type: "claim",
        positionId: "pos-update-loop",
        claim: "The useful unit is the research update and its provenance, not a web page.",
        judgment: "Use explicit state transitions and reviewable proposals; keep publication and deployment owner-run.",
        confidence: "high",
      },
      evidence: [
        evidence("ev-update-article", "web", "silan://resources/blog/make-research-work-findable", "Silan authored article", "supports", "Defines capture -> structure -> propose -> publish -> observe."),
        evidence("ev-viking-project", "code", "silan://resources/projects/silan-viking", "Silan Viking project", "supports", "Project describes CLI, validation, proposals, preview, deploy, and stats."),
        evidence("ev-update-limit", "observation", "silan://resources/blog/make-research-work-findable", "Silan authored article", "limits", "Packaged desktop onboarding remains future work."),
      ],
      sourceStatus: "source_checked",
      testStatus: "partial",
      artifacts: [{ uri: "silan://resources/blog/make-research-work-findable/assets/dashboard.png", kind: "figure", revision: "read-update-loop-2026-07-21", environment: "Silan Viking desktop/source checkout screenshot", observedAt: "2026-07-20" }],
      relations: [relation("implements", "silan://resources/projects/silan-viking"), relation("informs", "silan://resources/blog/proposal-authority-boundary")],
      limitations: ["Desktop onboarding and direct cross-device continuation remain product directions, not current public promises."],
      action: {
        actionId: "act-update-decision",
        description: "Use this lifecycle as the silan.dev content workflow contract.",
        status: "completed",
        createdAt: "2026-07-20",
        completedAt: "2026-07-21",
        outcome: "SPEC separates proposal, visibility, and site delivery states.",
        consumerUri: "silan://resources/blog/proposal-authority-boundary",
      },
      surprise: "The system became simpler when the page stopped being the lifecycle owner.",
      payload: {
        kind: "reading",
        priorExpectation: "Website maintenance could be solved by improving the frontend workflow.",
        accepted: "The content event, its provenance, and its state transitions are the real product boundary.",
        rejected: "Autonomous publication or copied page variants as a maintenance fix.",
        transferPlan: "Use as the contract behind silan.dev and multi-site Desktop preview.",
      },
      media: { src: "/media/research-public-site.png", alt: "Reviewed content projected into a public site.", tone: "system" },
    }),
    consumptionEvents: [
      consumption("consume-loop-to-boundary", "silan://resources/blog/make-research-work-findable", "read-update-loop-2026-07-21", "silan://resources/blog/proposal-authority-boundary", "decision-proposal-2026-07-21", "decision", "Proposal authority and deployment authority remain separate in the site architecture."),
    ],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "decision",
      slug: "proposal-authority-boundary",
      title: "Agents can propose maintenance; Silan keeps publication authority",
      summary: "A decision record that prevents Silan Viking support for silan.dev from becoming autonomous public authorship.",
      sourceUri: "silan://resources/blog/proposal-authority-boundary",
      revisionId: "decision-proposal-2026-07-21",
      subjectRelationship: "built",
      role: "system owner",
      publishedAt: "2026-07-21",
      revisitAt: "2026-08-20",
      question: "How should silan.dev use agents without letting them publish unsupported claims?",
      position: {
        type: "claim",
        positionId: "pos-proposal-boundary",
        claim: "Agent work stops at reviewable proposals; acceptance, visibility, publication, and deployment are owner actions.",
        judgment: "This preserves public accountability while still reducing repeated maintenance.",
        confidence: "high",
      },
      evidence: [
        evidence("ev-silan-viking-mcp", "code", "silan://resources/projects/silan-viking", "Silan Viking project", "supports", "MCP retrieval and proposal flow are available; publication remains explicit."),
        evidence("ev-spec-boundary", "observation", "plan/04-content-workflow-spec.md", "silan.dev SPEC", "limits", "Agents may prepare proposals but may not invent evidence or publish."),
      ],
      sourceStatus: "source_checked",
      testStatus: "partial",
      artifacts: [{ uri: "silan mcp serve --stdio", kind: "procedure", revision: "silan-viking-1.0.0", environment: "local Silan Viking CLI", observedAt: "2026-07-21" }],
      relations: [relation("implements", "silan://resources/projects/silan-viking"), relation("limits", "silan://resources/blog/stale-project-page-failure")],
      limitations: ["This rule does not remove owner review time; it makes review bounded and inspectable."],
      action: {
        actionId: "act-proposal-desktop",
        description: "Expose profile-aware preview before any deployment operation.",
        status: "planned",
        createdAt: "2026-07-21",
      },
      whyNow: "silan.dev only works if the public site can update frequently without moving authorship to agents.",
      payload: {
        kind: "decision",
        context: "A second site needs Silan Viking support while preserving one authored content graph.",
        alternatives: ["Agents edit and publish directly", "Agents draft proposals only", "Disable agents for public maintenance"],
        decisionRule: "Use the most helpful boundary that keeps public claims owner-reviewed.",
        chosenAction: "Agents may retrieve context, normalize metadata, and prepare proposals; owner controls acceptance and publication.",
        observedResult: "The site profile and validator can update projections without mutating authored content.",
        transferCondition: "Requires visible diffs, source revision checks, and profile-aware preview.",
      },
      media: { src: "/media/silan-viking-dashboard.png", alt: "Silan Viking dashboard.", tone: "system" },
    }),
    consumptionEvents: [],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "failure",
      slug: "stale-project-page-failure",
      title: "A correct result can still leave the public project page wrong",
      summary: "A failure fixture for the maintenance gap that motivated Silan Viking and now silan.dev.",
      sourceUri: "silan://resources/blog/stale-project-page-failure",
      revisionId: "failure-stale-page-2026-07-21",
      subjectRelationship: "built",
      role: "system owner",
      publishedAt: "2026-07-21",
      revisitAt: "2026-08-05",
      question: "What failure does a research workbench have to prevent?",
      position: {
        type: "claim",
        positionId: "pos-stale-page-failure",
        claim: "A correct research judgment can disappear from public memory when update operations span note, article, project, resume, media, metadata, and deploy steps.",
        judgment: "The fix is a provenance-preserving update workflow, not a prettier static page.",
        confidence: "high",
      },
      evidence: [
        evidence("ev-building-viking", "web", "silan://resources/blog/building-silan-viking", "Silan authored article", "supports", "Article states the correct explanation existed before the public record updated."),
        evidence("ev-maintenance-limits", "observation", "silan://resources/projects/silan-viking", "Silan Viking project", "limits", "Git remains the cross-machine path; full automation is not claimed."),
      ],
      sourceStatus: "source_checked",
      testStatus: "failed",
      artifacts: [{ uri: "silan-viking site status", kind: "procedure", revision: "silan-viking-1.0.0", environment: "configured Silan Viking workspace", observedAt: "2026-07-20" }],
      relations: [relation("supports", "pos-update-loop"), relation("informs", "pos-proposal-boundary")],
      limitations: ["This is an operational failure pattern; it does not prove every researcher needs the same tooling."],
      action: {
        actionId: "act-stale-site",
        description: "Keep the failure as a first-class fixture in silan.dev validation.",
        status: "completed",
        createdAt: "2026-07-21",
        completedAt: "2026-07-21",
        outcome: "Homepage and validator both expose failure records without treating them as public achievements.",
      },
      surprise: "The failure was not writing; it was preserving the reason a public page should change.",
      payload: {
        kind: "failure",
        expected: "A new verified result should update article, project page, resume evidence, metadata, and deployed site while context is fresh.",
        observed: "Each individual update step was reasonable, but together they delayed the public record until the best context faded.",
        environment: "Silan Viking pre-workflow website maintenance",
        eliminatedCauses: ["The blocker was not inability to build a webpage.", "The blocker was not a lack of writing ideas."],
        remainingExplanations: ["The update lacked one stable identity across surfaces.", "Publication, deployment, and diagnosis were not separately visible."],
      },
      media: { src: "/media/update-dashboard.png", alt: "Dashboard separating deployed version checks from diagnostics.", tone: "system" },
    }),
    consumptionEvents: [
      consumption("consume-stale-to-loop", "silan://resources/blog/stale-project-page-failure", "failure-stale-page-2026-07-21", "silan://resources/blog/make-research-work-findable", "read-update-loop-2026-07-21", "synthesis", "Failure shaped the research update lifecycle abstraction."),
    ],
    revisitStatus: "scheduled",
  },
  {
    unit: unit({
      kind: "research_map",
      slug: "research-update-workbench-map",
      title: "Research update workbench map",
      summary: "A compact map connecting reading, failure, decision, and implementation evidence behind silan.dev.",
      sourceUri: "silan://resources/blog/research-update-workbench-map",
      revisionId: "map-update-workbench-2026-07-21",
      subjectRelationship: "built",
      role: "site architect",
      publishedAt: "2026-07-21",
      revisitAt: "2026-09-30",
      question: "What evidence supports a second site focused on process evidence rather than formal identity?",
      position: {
        type: "claim",
        positionId: "pos-workbench-map",
        claim: "silan.dev should be a process-evidence projection over Silan Viking, not a fork of silan.tech.",
        judgment: "The map qualifies because it has reading, decision, and failure evidence plus explicit gaps.",
        confidence: "medium",
      },
      evidence: [
        evidence("ev-plan-positioning", "web", "plan/00-positioning.md", "silan.dev positioning SPEC", "supports", "Defines the two-site distinction and evidence contract."),
        evidence("ev-plan-workflow", "web", "plan/04-content-workflow-spec.md", "silan.dev workflow SPEC", "limits", "Full frontend remains gated by reader tasks and workflow pilot."),
      ],
      sourceStatus: "source_checked",
      testStatus: "partial",
      artifacts: [{ uri: "fixtures/silan-dev-fixtures.json", kind: "dataset", revision: "map-update-workbench-2026-07-21", environment: "validated TypeScript fixture projection", observedAt: "2026-07-21" }],
      relations: [
        relation("documents", "silan://resources/blog/make-research-work-findable"),
        relation("documents", "silan://resources/blog/proposal-authority-boundary"),
        relation("documents", "silan://resources/blog/stale-project-page-failure"),
      ],
      limitations: ["Reader tasks and four-week maintenance gates are not claimed complete by this map."],
      action: {
        actionId: "act-map-pilot",
        description: "Use map as the low-fidelity homepage evidence source until reader tests replace it.",
        status: "planned",
        createdAt: "2026-07-21",
      },
      whyNow: "It is the smallest map that keeps silan.dev honest about both value and unfinished evidence.",
      payload: {
        kind: "research_map",
        thesis: "A public process-evidence site is justified only when it helps readers trace claims to tests, decisions, failures, and reusable artifacts.",
        evidenceGap: "Five-person reader tasks and four-week operating-cost data still need to be run.",
        qualifyingUnitUris: [
          "silan://resources/blog/make-research-work-findable",
          "silan://resources/blog/proposal-authority-boundary",
          "silan://resources/blog/stale-project-page-failure",
          "silan://resources/blog/gem-bench-ai-answers-with-ads",
        ],
      },
      media: { src: "/media/silan-viking-flow.png", alt: "Silan Viking flow from capture to public projection.", tone: "diagram" },
    }),
    consumptionEvents: [],
    revisitStatus: "scheduled",
  },
];

export const projectProfiles: ProjectSubjectProfile[] = [
  {
    projectUri: "silan://resources/projects/silan-viking",
    slug: "silan-viking",
    title: "Silan Viking",
    summary: "A research publishing workspace for capture, proposals, explicit publication, deployment checks, and reader diagnostics.",
    revisionId: "project-silan-viking-2026-07-21",
    subjectRelationship: "built",
    role: "creator and maintainer",
    contribution: "Designed the content engine, proposal boundary, static projections, CLI/Desktop workflow, and site diagnostics.",
    sourceVisibility: "public",
    artifacts: [{ uri: "silan://resources/projects/silan-viking/assets/dashboard.png", kind: "figure", revision: "project-silan-viking-2026-07-21", observedAt: "2026-07-20" }],
    media: { src: "/media/silan-viking-dashboard.png", alt: "Silan Viking dashboard screenshot.", tone: "system" },
  },
  {
    projectUri: "silan://resources/projects/gem-bench",
    slug: "gem-bench",
    title: "GEM-Bench",
    summary: "A KDD 2026 benchmark for ad-injected response generation, useful as an offline screen for answer damage.",
    revisionId: "project-gem-bench-2026-07-21",
    subjectRelationship: "contributed",
    role: "co-author and benchmark contributor",
    contribution: "Helped turn the AIR problem into a benchmark with datasets, metrics, baselines, and a reproducible code path.",
    sourceVisibility: "public",
    artifacts: [{ uri: "https://github.com/Generative-Engine-Marketing/GEM-Bench", kind: "code", revision: "public-main" }],
    media: { src: "/media/gem-bench-map.png", alt: "GEM-Bench evaluation map.", tone: "diagram" },
  },
  {
    projectUri: "silan://resources/projects/llm-auction",
    slug: "llm-auction",
    title: "LLM-Auction",
    summary: "Later work that uses GEM-Bench as an AIR generation layer while adding auction and incentive questions.",
    revisionId: "project-llm-auction-2026-07-21",
    subjectRelationship: "studied",
    sourceVisibility: "public",
    artifacts: [{ uri: "https://arxiv.org/html/2512.10551v1", kind: "procedure", observedAt: "2026-07-20" }],
  },
  {
    projectUri: "silan://resources/projects/naiad",
    slug: "naiad",
    title: "NaiAD",
    summary: "Collected adjacent work on harder data for commercial intervention and answer generation.",
    revisionId: "project-naiad-2026-07-21",
    subjectRelationship: "collected",
    sourceVisibility: "public",
    artifacts: [{ uri: "https://arxiv.org/html/2605.09918", kind: "procedure", observedAt: "2026-07-20" }],
  },
];

const knowledgeProjections: SiteProjection[] = knowledgeAggregates.map(({ unit: item }) => ({
  sourceUri: item.sourceUri,
  siteId: "silan-dev",
  route: item.developmentState === "synthesized" && item.kind === "research_map" ? `/maps/${item.slug}` : `/units/${"slug" in item ? item.slug : ""}`,
  projectionMode: "full",
  seoOwnership: "canonical",
  canonicalOwner:
    item.developmentState === "synthesized" && item.kind === "research_map"
      ? `https://silan.dev/maps/${item.slug}`
      : `https://silan.dev/units/${"slug" in item ? item.slug : ""}`,
  projectionVisibility: item.sourceVisibility,
  historicalStatus: item.validityState,
  sourceRevisionId: item.revisionId,
  framingPart: {
    uri: `${item.sourceUri}/site-framing`,
    revisionId: `${item.revisionId}-framing`,
    siteId: "silan-dev",
    proposalId: `proposal-${"slug" in item ? item.slug : item.revisionId}`,
  },
}));

export const siteProjections: SiteProjection[] = [
  projection("silan://resources/resume/resume", "silan-tech", "/", "full", "canonical", "https://silan.tech/", "resume-silan-2026-07-21"),
  projection("silan://resources/resume/resume", "silan-dev", "/", "reference", "noindex", "https://silan.tech/", "resume-silan-2026-07-21"),
  projection("silan://resources/projects/silan-viking", "silan-tech", "/projects/silan-viking", "full", "canonical", "https://silan.tech/projects/silan-viking", "project-silan-viking-2026-07-21"),
  projection("silan://resources/projects/silan-viking", "silan-dev", "/work/silan-viking", "excerpt", "noindex", "https://silan.tech/projects/silan-viking", "project-silan-viking-2026-07-21"),
  projection("silan://resources/projects/gem-bench", "silan-tech", "/projects/gem-bench", "full", "canonical", "https://silan.tech/projects/gem-bench", "project-gem-bench-2026-07-21"),
  projection("silan://resources/projects/gem-bench", "silan-dev", "/work/gem-bench", "excerpt", "noindex", "https://silan.tech/projects/gem-bench", "project-gem-bench-2026-07-21"),
  ...knowledgeProjections,
];

export const consumptionEvents: ConsumptionEvent[] = knowledgeAggregates.flatMap(
  (aggregate) => aggregate.consumptionEvents,
);

function evidence(
  evidenceId: string,
  kind: "paper" | "dataset" | "code" | "run" | "observation" | "web",
  locator: string,
  sourceIdentity: string,
  relationKind: "supports" | "limits" | "contradicts",
  note: string,
) {
  return {
    evidenceId,
    kind,
    locator,
    sourceIdentity,
    relation: relationKind,
    checkedAt: "2026-07-21",
    independenceGroup: sourceIdentity,
    independenceReviewedAt: reviewedAt,
    note,
  };
}

function relation(
  predicate: "supports" | "contradicts" | "revises" | "supersedes" | "limits" | "informs" | "tests" | "implements" | "documents" | "related",
  targetId: string,
) {
  return { predicate, targetId, ownerReviewedAt: reviewedAt };
}

function consumption(
  eventId: string,
  sourceUnitUri: string,
  sourceRevisionId: string,
  consumerUri: string,
  consumerRevisionId: string,
  kind: "test" | "decision" | "synthesis" | "correction",
  outcome: string,
): ConsumptionEvent {
  return {
    eventId,
    sourceUnitUri,
    sourceRevisionId,
    consumerUri,
    consumerRevisionId,
    kind,
    occurredAt: "2026-07-21",
    outcome,
    ownerReviewedAt: reviewedAt,
  };
}

function projection(
  sourceUri: string,
  siteId: string,
  route: string,
  projectionMode: SiteProjection["projectionMode"],
  seoOwnership: SiteProjection["seoOwnership"],
  canonicalOwner: string,
  sourceRevisionId: string,
): SiteProjection {
  return {
    sourceUri,
    siteId,
    route,
    projectionMode,
    seoOwnership,
    canonicalOwner,
    projectionVisibility: "public",
    historicalStatus: "current",
    sourceRevisionId,
    framingPart: {
      uri: `${sourceUri}/site-framing`,
      revisionId: `${sourceRevisionId}-framing`,
      siteId,
      proposalId: `proposal-${sourceRevisionId}`,
    },
  };
}
