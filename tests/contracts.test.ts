import assert from "node:assert/strict";
import test from "node:test";
import {
  knowledgeAggregates,
  projectProfiles,
  siteProjections,
} from "../lib/silan-viking/fixtures";
import {
  homepageFeatureEligible,
  validateAll,
  validateProjections,
} from "../lib/silan-viking/validator";
import {
  assertDeployMatchesActiveSite,
  canSwitchSite,
  transitionDeploy,
  type DeployTransaction,
} from "../lib/silan-viking/stateMachines";
import {
  activeSilanDevContext,
  getFeaturedAggregates,
  getLibraryProjects,
  getRouteMatrix,
  getWorkProjects,
} from "../lib/site/projection";

test("all SPEC fixtures pass public, project, and projection validators", () => {
  const validation = validateAll(knowledgeAggregates, projectProfiles, siteProjections);
  assert.deepEqual(validation.issues, []);
  assert.equal(validation.ok, true);
});

test("phase 0.5 fixture mix covers reading, decisions, failures, chains, and changed-use facts", () => {
  const kinds = knowledgeAggregates.map((aggregate) => aggregate.unit.developmentState === "synthesized" ? aggregate.unit.kind : "captured");
  assert.equal(kinds.filter((kind) => kind === "reading").length >= 2, true);
  assert.equal(kinds.filter((kind) => kind === "decision" || kind === "experiment").length >= 2, true);
  assert.equal(kinds.filter((kind) => kind === "failure").length >= 2, true);

  const consumptionKinds = knowledgeAggregates.flatMap((aggregate) =>
    aggregate.consumptionEvents.map((event) => event.kind),
  );
  assert.equal(consumptionKinds.includes("test"), true);
  assert.equal(consumptionKinds.includes("decision"), true);
  assert.equal(consumptionKinds.includes("synthesis"), true);
});

test("homepage feature gate requires public gate plus evidence of test, consumption, or changed judgment", () => {
  const featured = getFeaturedAggregates(10);
  assert.equal(featured.length >= 3, true);
  assert.equal(featured.every(homepageFeatureEligible), true);
});

test("work and library do not conflate subject relationships", () => {
  assert.equal(getWorkProjects().every((project) => ["built", "contributed"].includes(project.subjectRelationship)), true);
  assert.equal(getLibraryProjects().every((project) => ["studied", "collected"].includes(project.subjectRelationship)), true);
});

test("three shared items project across both sites without indexed duplicate bodies", () => {
  const shared = getRouteMatrix().filter((entry) => entry.silanDev && entry.silanTech);
  assert.equal(shared.length >= 3, true);
  for (const entry of shared) {
    assert.equal(entry.silanDev?.seoOwnership, "noindex");
  }
});

test("projection validator rejects illegal full canonical conflict", () => {
  const invalid = validateProjections([
    ...siteProjections,
    {
      ...siteProjections[0],
      sourceUri: "silan://resources/blog/conflicting-copy",
    },
  ]);
  assert.equal(invalid.ok, false);
  assert.equal(invalid.issues.some((item) => item.code === "canonical-conflict"), true);
});

test("site switching and deploy guards keep active site explicit", () => {
  assert.equal(canSwitchSite("deploying", false), false);
  assert.equal(canSwitchSite("none", true), false);
  assert.equal(canSwitchSite("none", false), true);

  const transaction: DeployTransaction = {
    transactionId: "tx-dev",
    siteId: "silan-dev",
    domain: "silan.dev",
    profileRevisionId: "profile-silan-dev-2026-07-21",
    sourceRevisionId: "source-fixtures-2026-07-21",
    artifactHash: "hash-dev",
    state: "prepared",
  };
  assert.equal(transitionDeploy(transaction, "confirming").state, "confirming");
  assertDeployMatchesActiveSite(activeSilanDevContext, transaction);
  assert.throws(() =>
    assertDeployMatchesActiveSite(activeSilanDevContext, {
      ...transaction,
      siteId: "silan-tech",
      domain: "silan.tech",
    }),
  );
});
