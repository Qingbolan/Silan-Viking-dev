import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/SiteShell";
import { UnitView } from "../../../components/UnitView";
import { getAggregateBySlug, getPublicAggregates } from "../../../lib/site/projection";

export function generateStaticParams() {
  return getPublicAggregates()
    .filter(
      (aggregate) =>
        aggregate.unit.developmentState === "synthesized" &&
        aggregate.unit.kind !== "research_map",
    )
    .map((aggregate) => ({ slug: "slug" in aggregate.unit ? aggregate.unit.slug : "" }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const aggregate = getAggregateBySlug(slug);
  if (!aggregate || aggregate.unit.developmentState !== "synthesized") return {};
  return {
    title: `${aggregate.unit.title} — Silan.dev`,
    description: aggregate.unit.summary,
    alternates: { canonical: `https://silan.dev/units/${aggregate.unit.slug}` },
  };
}

export default async function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const aggregate = getAggregateBySlug(slug);
  if (
    !aggregate ||
    aggregate.unit.developmentState !== "synthesized" ||
    aggregate.unit.kind === "research_map"
  ) {
    notFound();
  }

  return (
    <SiteShell>
      <UnitView aggregate={aggregate} />
    </SiteShell>
  );
}
