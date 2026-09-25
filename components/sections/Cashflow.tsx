"use client";

import { motion } from "motion/react";
import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { JCurve } from "@/components/charts/JCurve";
import { cashflowCurve, project, scenarios } from "@/data/economic-case-study";
import { fadeUp, inView, stagger } from "@/lib/motion";

const terms: Array<{ t: string; c?: string; op?: string; tone?: "revenue" | "cost" | "gov" | "result" }> = [
  { t: "Production", c: "barrels per year" },
  { op: "×", t: "Oil price", c: "per barrel" },
  { op: "=", t: "Revenue", c: "gross value", tone: "revenue" },
  { op: "−", t: "Government share", c: "fiscal split", tone: "gov" },
  { op: "−", t: "OPEX", c: "running cost", tone: "cost" },
  { op: "−", t: "CAPEX", c: "investment", tone: "cost" },
  { op: "=", t: "Contractor cashflow", c: "per year", tone: "result" },
];

const toneColor = { revenue: "text-[#e0ae62]", cost: "text-cost", gov: "text-text-2", result: "text-accent" } as const;

export function Cashflow() {
  return (
    <Section
      id="cashflow"
      index="07"
      eyebrow="Cashflow"
      tone="deep"
      title="Production and price in. Cost and state share out. What is left is value."
      lede={`Each year of the ${project.horizon.years}-year life (${project.horizon.start}–${project.horizon.end}) becomes one line of cashflow. Discounting those lines at 10% turns a production profile into a single present value.`}
    >
      <motion.ol
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        aria-label="Cashflow equation"
        className="mt-16 flex flex-wrap items-end gap-x-4 gap-y-6 border-y border-line py-10"
      >
        {terms.map((term) => (
          <motion.li key={term.t} variants={fadeUp} className="flex items-end gap-4">
            {term.op && (
              <span aria-hidden className="pb-6 font-mono text-2xl text-text-3">
                {term.op}
              </span>
            )}
            <span className="flex flex-col">
              <span className={`font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] leading-none ${term.tone ? toneColor[term.tone] : "text-text"}`}>{term.t}</span>
              <span className="mt-2 font-mono text-[0.7rem] tracking-wide text-text-3">{term.c}</span>
            </span>
          </motion.li>
        ))}
      </motion.ol>

      <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
        <Reveal className="space-y-6">
          <p className="eyebrow">The shape of the investment</p>
          <p className="text-lede text-text-2">
            Both scenarios spend first — wells, flowlines and facilities — and only then earn. The curve bottoms out during build-out and turns positive once the
            new wells are on stream.
          </p>
          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6">
            {(["A", "B"] as const).map((s) => (
              <div key={s}>
                <dt className="font-mono text-[0.72rem] tracking-[0.12em] uppercase" style={{ color: s === "A" ? "var(--scen-a)" : "var(--scen-b)" }}>
                  {s} · pay out
                </dt>
                <dd className="mt-1 font-display text-[2.4rem] leading-none tabular">
                  {scenarios[s].metrics.potYears.value}
                  <span className="ml-1 text-lg text-text-3">yrs</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-caption text-text-3">B spends more before it earns, then climbs faster and ends 1.8× higher.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <JCurve />
          <SourceNote approximate>{cashflowCurve.source}. Contractor, Gross Split, 10% discount rate; end values match the reported NPV.</SourceNote>
        </Reveal>
      </div>
    </Section>
  );
}
