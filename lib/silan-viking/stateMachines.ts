import type { ActiveSiteContext } from "./contracts";

export type DeployTransactionState =
  | "prepared"
  | "confirming"
  | "deploying"
  | "verifying"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface DeployTransaction {
  transactionId: string;
  siteId: string;
  domain: string;
  profileRevisionId: string;
  sourceRevisionId: string;
  artifactHash: string;
  state: DeployTransactionState;
  previousVerifiedHash?: string;
  failureReason?: string;
}

export function canSwitchSite(
  deployState: DeployTransactionState | "none",
  hasUnsavedProjectionEdit: boolean,
): boolean {
  if (hasUnsavedProjectionEdit) return false;
  return !["confirming", "deploying", "verifying"].includes(deployState);
}

export function transitionDeploy(
  transaction: DeployTransaction,
  next: DeployTransactionState,
): DeployTransaction {
  const allowed = new Set([
    "prepared->confirming",
    "confirming->deploying",
    "deploying->verifying",
    "verifying->succeeded",
    "prepared->cancelled",
    "confirming->cancelled",
    "confirming->failed",
    "deploying->failed",
    "verifying->failed",
  ]);
  if (!allowed.has(`${transaction.state}->${next}`)) {
    throw new Error(`Invalid deploy transition ${transaction.state} -> ${next}`);
  }
  return { ...transaction, state: next };
}

export function assertDeployMatchesActiveSite(
  context: ActiveSiteContext,
  transaction: DeployTransaction,
): void {
  if (context.siteId !== transaction.siteId) {
    throw new Error(`Deploy target ${transaction.siteId} does not match active site ${context.siteId}`);
  }
  if (context.siteProfile.domain !== transaction.domain) {
    throw new Error(`Deploy domain ${transaction.domain} does not match profile domain ${context.siteProfile.domain}`);
  }
}
