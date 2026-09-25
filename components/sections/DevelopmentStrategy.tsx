"use client";

import { motion } from "motion/react";
import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { RatioLadder, type LadderRow } from "@/components/charts/RatioLadder";
import { costs, ratio, scenarios } from "@/data/economic-case-study";
import { inView } from "@/lib/motion";

const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const A = scenarios.A;
const B = scenarios.B;
const growth = (item: string) => [...costs.capex, ...costs.opex].find((c) => c.item === item)!.growth;

const rows: LadderRow[] = [
  { label: "Producing wells", a: `${A.wells}`, b: `${B.wells}`, multiple: B.wells / A.wells, group: "input" },
  { label: "Drilling & completion", a: "baseline", b: `${growth("Drilling & completion")}× base`, multiple: growth("Drilling & completion"), group: "cost", note: "Relative, from the cost table" },
  { label: "Surface facilities", a: "baseline", b: `${growth("Surface facilities")}× base`, multiple: growth("Surface facilities"), group: "cost", note: "Capacity step, not linear" },
  { label: "Peak oil rate", a: `${fmt(A.peakOilRateBopd.value)} bopd`, b: `${fmt(B.peakOilRateBopd.value)} bopd`, multiple: B.peakOilRateBopd.value / A.peakOilRateBopd.value, group: "input" },
  { label: "Recovery factor", a: `${A.recoveryFactorPct.value.toFixed(1)}%`, b: `${B.recoveryFactorPct.value.toFixed(1)}%`, multiple: B.recoveryFactorPct.value / A.recoveryFactorPct.value, group: "input" },
  { label: "Cumulative oil", a: `${fmt(A.cumulativeOilMMSTB.value, 1)} MMSTB`, b: `${fmt(B.cumulativeOilMMSTB.value, 1)} MMSTB`, multiple: B.cumulativeOilMMSTB.value / A.cumulativeOilMMSTB.value, group: "input" },
  { label: "NPV @ 10%", a: fmt(A.metrics.npv10.value), b: fmt(B.metrics.npv10.value), multiple: ratio("npv10"), group: "value" },
  { label: "Value creation", a: fmt(A.metrics.valueCreation.value), b: fmt(B.metrics.valueCreation.value), multiple: ratio("valueCreation"), group: "value" },
  { label: "Pay out time", a: `${A.metrics.potYears.value} yrs`, b: `${B.metrics.potYears.value} yrs`, multiple: ratio("potYears"), group: "time", note: "Higher is slower — barely moved" },
];

function WellDots({ count, highlightFrom }: { count: number; highlightFrom: number }) {
  return (
    <div aria-hidden className="flex flex-wrap gap-2.5">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="size-3 rounded-full border"
          style={
            i < highlightFrom
              ? { borderColor: "var(--scen-a)", background: "color-mix(in oklab, var(--scen-a) 35%, transparent)" }
              : { borderColor: "var(--scen-b)", background: "var(--scen-b)" }
          }
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.35, delay: i * 0.025 }}
        />
      ))}
    </div>
  );
}

export function DevelopmentStrategy() {
  const npvUp = Math.round((ratio("npv10") - 1) * 100);
  return (
    <Section
      id="strategy"
      index="04"
      eyebrow="Development strategy"
      title={
        <>
          Twice the wells. <em className="text-text-2">Was it worth</em> twice the capital?
        </>
      }
      lede="The reservoir and production team proposed two development scales for a 20-year life. My task was to show how the extra scale changes investment, production, cost and value — together."
    >
      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
        {[A, B].map((s) => (
          <Reveal key={s.id} className="border-t border-line-strong pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-h3" style={{ color: s.id === "A" ? "var(--scen-a)" : "var(--scen-b)" }}>
                {s.name}
              </h3>
              <p className="font-display text-metric tabular">{s.wells}</p>
            </div>
            <p className="mb-6 text-caption text-text-3">producing wells · {s.description}</p>
            <WellDots count={s.wells} highlightFrom={s.id === "A" ? s.wells : A.wells} />
          </Reveal>
        ))}
      </div>

      <RatioLadder rows={rows} />
      <SourceNote>Tables 4.3–4.5 (production), Table 8.2 (cost), Tables 8.3–8.4 (economics). Log scale.</SourceNote>

      <Reveal className="mt-16 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <p className="eyebrow pt-2">What the ladder says</p>
        <p className="font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] leading-snug text-text">
          Doubling the wells doubled drilling spend and needed a ten-times larger surface facility. It also lifted recovery 1.7× and NPV by{" "}
          <span className="text-scen-b">{npvUp}%</span> — while pay out time moved by only 0.07 years. The extra scale paid for itself.
        </p>
      </Reveal>
    </Section>
  );
}
