"use client";

import { motion } from "motion/react";
import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { dpiHurdle, metricNotes, scenarios, type Scenario } from "@/data/economic-case-study";
import { duration, ease, inView } from "@/lib/motion";

type Key = keyof Scenario["metrics"];

const metrics: Array<{ key: Key; name: string; format: (v: number) => string; scaleMax: number; better: "higher" | "lower"; hurdle?: number; unit?: string }> = [
  { key: "npv10", name: "NPV @ 10%", format: (v) => v.toLocaleString("en-US", { maximumFractionDigits: 0 }), scaleMax: 24000, better: "higher" },
  { key: "valueCreation", name: "Value creation", format: (v) => v.toLocaleString("en-US", { maximumFractionDigits: 0 }), scaleMax: 24000, better: "higher" },
  { key: "irrPct", name: "IRR", format: (v) => `${v}%`, scaleMax: 60, better: "higher" },
  { key: "dpi", name: "DPI", format: (v) => v.toFixed(2), scaleMax: 10, better: "higher", hurdle: dpiHurdle.value },
  { key: "potYears", name: "Pay out time", format: (v) => `${v.toFixed(2)} yrs`, scaleMax: 4, better: "lower" },
];

function Bars({ m }: { m: (typeof metrics)[number] }) {
  return (
    <div className="relative space-y-2 pt-1" aria-hidden>
      {(["A", "B"] as const).map((s, i) => {
        const v = scenarios[s].metrics[m.key].value;
        return (
          <div key={s} className="flex items-center gap-3">
            <span className="w-3 font-mono text-[0.7rem] text-text-3">{s}</span>
            <div className="relative h-2.5 flex-1 rounded-full bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-full"
                style={{ width: `${(v / m.scaleMax) * 100}%`, background: s === "A" ? "var(--scen-a)" : "var(--scen-b)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inView}
                transition={{ duration: duration.slow, ease: ease.out, delay: i * 0.12 }}
              />
            </div>
          </div>
        );
      })}
      {m.hurdle && (
        <div className="pointer-events-none absolute inset-y-0 right-0 left-6">
          <span className="absolute -top-1 bottom-[-0.9rem] w-px bg-cost" style={{ left: `${(m.hurdle / m.scaleMax) * 100}%` }} />
          <span className="absolute bottom-[-1.35rem] -translate-x-1/2 font-mono text-[0.65rem] whitespace-nowrap text-cost" style={{ left: `${(m.hurdle / m.scaleMax) * 100}%` }}>
            hurdle {m.hurdle}
          </span>
        </div>
      )}
    </div>
  );
}

export function EconomicPerformance() {
  return (
    <Section
      id="performance"
      index="08"
      eyebrow="Economic performance"
      title={
        <>
          Both scenarios pass. <em className="text-scen-b">One creates far more value.</em>
        </>
      }
      lede="I read the five indicators together rather than chasing one number. Each answers a different investor question: how much, how fast, how efficient."
    >
      <div className="mt-16" role="table" aria-label="Economic indicators, Scenario A versus Scenario B">
        <div role="row" className="hidden grid-cols-[1.4fr_7rem_7rem_1.6fr] gap-x-8 border-b border-line pb-3 font-mono text-[0.7rem] tracking-[0.12em] text-text-3 uppercase md:grid">
          <span role="columnheader">Indicator</span>
          <span role="columnheader" className="text-scen-a">Scenario A</span>
          <span role="columnheader" className="text-scen-b">Scenario B</span>
          <span role="columnheader">Comparison</span>
        </div>
        {metrics.map((m, i) => {
          const a = scenarios.A.metrics[m.key].value;
          const b = scenarios.B.metrics[m.key].value;
          const bWins = m.better === "higher" ? b > a : b < a;
          return (
            <Reveal key={m.key} delay={i * 0.05} className="grid grid-cols-2 gap-x-8 gap-y-4 border-b border-line py-8 md:grid-cols-[1.4fr_7rem_7rem_1.6fr] md:items-center">
              <div role="rowheader" className="col-span-2 md:col-span-1">
                <p className="font-display text-h3">{m.name}</p>
                <p className="mt-1 max-w-sm text-caption text-text-3">{metricNotes.definitions[m.key]}</p>
              </div>
              <p role="cell" className="font-display text-[2rem] leading-none text-scen-a tabular">
                <span className="mr-2 font-mono text-xs text-text-3 md:hidden">A</span>
                {m.format(a)}
              </p>
              <p role="cell" className="font-display text-[2rem] leading-none text-scen-b tabular">
                <span className="mr-2 font-mono text-xs text-text-3 md:hidden">B</span>
                {m.format(b)}
              </p>
              <div role="cell" className="col-span-2 pb-3 md:col-span-1">
                <Bars m={m} />
                <p className="mt-4 font-mono text-[0.72rem] text-text-2">
                  {m.key === "potYears"
                    ? `Near tie: B pays back ${(b - a).toFixed(2)} yrs later`
                    : bWins
                      ? `B ${m.key === "irrPct" ? `+${b - a} pts` : `+${Math.round((b / a - 1) * 100)}%`}`
                      : "A higher"}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
      <SourceNote>Tables 8.3 and 8.4, p. 74. {metricNotes.unitNote}</SourceNote>

      <Reveal className="mt-16 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <p className="eyebrow pt-2">Interpretation</p>
        <p className="font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] leading-snug">
          Four of five indicators favour B by a clear margin; the fifth, pay out time, is effectively a tie. That consistency — not one large NPV — is what made the
          recommendation robust.
        </p>
      </Reveal>
    </Section>
  );
}
