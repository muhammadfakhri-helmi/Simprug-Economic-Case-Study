"use client";

import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { Tornado } from "@/components/charts/Tornado";
import { sensitivity } from "@/data/economic-case-study";

export function SensitivityAnalysis() {
  const rev = sensitivity.drivers[0];
  const worstCost = Math.max(...sensitivity.drivers.filter((d) => d.kind === "cost").map((d) => Math.abs(d.downPct)));
  return (
    <Section
      id="sensitivity"
      index="09"
      eyebrow="Sensitivity"
      tone="deep"
      title={
        <>
          Revenue decides. <em className="text-text-2">Cost only adjusts.</em>
        </>
      }
      lede="Which assumption could break the case? I flexed each input by 30% up and down and watched the contractor NPV."
    >
      <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <Reveal>
          <Tornado />
          <SourceNote>{sensitivity.source}. The chart legend in the report is cropped, so the two cost lines are shown together as CAPEX / OPEX.</SourceNote>
        </Reveal>
        <Reveal delay={0.1} className="space-y-8">
          <div className="border-t border-line-strong pt-5">
            <p className="font-display text-metric text-[#e0ae62] tabular">±{Math.abs(rev.downPct).toFixed(0)}%</p>
            <p className="mt-2 text-text-2">NPV swing from a 30% change in revenue — price or volume.</p>
          </div>
          <div className="border-t border-line-strong pt-5">
            <p className="font-display text-metric text-cost tabular">≤ ±{worstCost.toFixed(0)}%</p>
            <p className="mt-2 text-text-2">Largest swing from the same change in a cost line.</p>
          </div>
          <div className="border-t border-line-strong pt-5">
            <p className="text-text">Every tested case stays NPV-positive.</p>
            <p className="mt-2 text-caption text-text-3">
              The economic risk sits in production delivery and oil price, not in cost overruns — so that is where monitoring and contingency should focus.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
