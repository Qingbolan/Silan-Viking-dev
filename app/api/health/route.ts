import { NextResponse } from "next/server";
import {
  knowledgeAggregates,
  projectProfiles,
  siteProjections,
} from "../../../lib/silan-viking/fixtures";
import { validateAll } from "../../../lib/silan-viking/validator";

export function GET() {
  const validation = validateAll(knowledgeAggregates, projectProfiles, siteProjections);
  return NextResponse.json(
    { ok: validation.ok, issues: validation.issues },
    { status: validation.ok ? 200 : 500 },
  );
}
