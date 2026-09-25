"use client";

import { motion } from "motion/react";
import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { fiscalModels } from "@/data/economic-case-study";
import { duration, ease, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { costRecovery: cr, grossSplit: gs, evidence } = fiscalModels;

function Segment({ width, className, children, delay = 0, hatch = false }: { width: number; className?: string; children: React.ReactNode; delay?: number; hatch?: boolean }) {
  return (
    <motion.div
      className={cn("relative flex h-16 origin-left items-end overflow-hidden px-3 pb-2 text-[0.8rem] font-medium", className)}
      style={{
        width: `${width}%`,
        backgroundImage: hatch ? "repeating-linear-gradient(135deg, rgb(11 18 32 / .12) 0 4px, transparent 4px 9px)" : undefined,
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      <span className="relative leading-tight">{children}</span>
    </motion.div>
  );
}

function FlowLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.95rem] text-ink-2">
      <span className="font-mono text-[0.72rem] text-ink-2/70 tabular">{n}</span>
      {children}
    </li>
  );
}

export function FiscalFramework() {
  const maxEv = Math.max(evidence.A.grossSplit, evidence.B.grossSplit);
  return (
    <Section
      id="fiscal"
      index="06"
      eyebrow="Fiscal framework"
      tone="paper"
      title={
        <>
          Same barrels. Different contract. <em className="text-gross-split-ink">Different value.</em>
        </>
      }
      lede="In Indonesia, production is shared between the contractor and the state. The contract decides when costs come back and how big each share is — so it changes the value of the same field."
    >
      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Cost Recovery */}
        <Reveal>
          <p className="font-mono text-[0.72rem] tracking-[0.14em] text-ink-2 uppercase">Option 1</p>
          <h3 className="mt-2 font-display text-h3">{cr.name}</h3>
          <ol className="mt-4 space-y-1">
            {cr.steps.map((s, i) => (
              <FlowLabel key={s} n={i + 1}>
                {s}
              </FlowLabel>
            ))}
          </ol>
          <div className="mt-8 flex w-full gap-px" aria-label={`Conceptual: costs recovered first, then profit oil split ${cr.contractorSharePct}% contractor and ${cr.governmentSharePct}% government`} role="img">
            <Segment width={34} hatch className="bg-cost-recovery/35 text-ink">
              Costs recovered
            </Segment>
            <Segment width={10} delay={0.2} className="bg-cost-recovery text-white">
              {cr.contractorSharePct}%
            </Segment>
            <Segment width={56} delay={0.3} className="bg-gov text-white">
              Government {cr.governmentSharePct}%
            </Segment>
          </div>
          <p className="mt-3 text-caption text-ink-2">
            Conceptual widths. Split after cost recovery: contractor {cr.contractorSharePct}% / government {cr.governmentSharePct}% for oil. Strength: {cr.strength.toLowerCase()}.
          </p>
        </Reveal>

        {/* Gross Split */}
        <Reveal delay={0.1}>
          <p className="font-mono text-[0.72rem] tracking-[0.14em] text-gross-split-ink uppercase">Option 2 · selected</p>
          <h3 className="mt-2 font-display text-h3">{gs.name}</h3>
          <ol className="mt-4 space-y-1">
            {gs.steps.map((s, i) => (
              <FlowLabel key={s} n={i + 1}>
                {s}
              </FlowLabel>
            ))}
          </ol>
          <div className="mt-8 flex w-full gap-px" role="img" aria-label={`Gross production split directly: contractor ${gs.contractorSharePct}% base, government ${gs.governmentSharePct}% base`}>
            <Segment width={gs.contractorSharePct} className="bg-gross-split text-ink">
              Contractor {gs.contractorSharePct}%
            </Segment>
            <Segment width={gs.governmentSharePct} delay={0.2} className="bg-gov text-white">
              Government {gs.governmentSharePct}%
            </Segment>
          </div>
          <p className="mt-3 text-caption text-ink-2">
            Base split, adjusted by variable components ({gs.variableComponents.slice(0, 4).join(", ").toLowerCase()}…) and progressive components ({gs.progressiveComponents.join(", ").toLowerCase()}). The contractor funds all costs from its share.
          </p>
        </Reveal>
      </div>

      {/* evidence */}
      <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <p className="font-mono text-[0.72rem] tracking-[0.14em] text-ink-2 uppercase">The evidence</p>
          <p className="mt-3 font-display text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)] leading-snug">
            At the end of the 20-year horizon, Gross Split left the contractor with roughly{" "}
            <span className="text-gross-split-ink">2–3× the discounted cashflow</span> of Cost Recovery, in both scenarios.
          </p>
          <ul className="mt-8 space-y-3 border-t border-line-paper pt-6">
            {fiscalModels.decision.reasons.map((r) => (
              <li key={r} className="flex gap-3 text-ink-2">
                <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-gross-split-ink" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="img" aria-label={`Contractor cumulative discounted cashflow at end of horizon. Scenario A: Cost Recovery about ${evidence.A.costRecovery.toLocaleString()}, Gross Split about ${evidence.A.grossSplit.toLocaleString()}. Scenario B: Cost Recovery about ${evidence.B.costRecovery.toLocaleString()}, Gross Split about ${evidence.B.grossSplit.toLocaleString()}.`}>
            {(["A", "B"] as const).map((s) => {
              const e = evidence[s];
              return (
                <div key={s} className="border-b border-line-paper py-6 first:pt-0">
                  <div className="mb-3 flex items-baseline justify-between">
                    <p className="font-medium">Scenario {s}</p>
                    <p className="font-mono text-[0.85rem] text-gross-split-ink tabular">≈{(e.grossSplit / e.costRecovery).toFixed(1)}×</p>
                  </div>
                  {[
                    { label: "Cost Recovery", v: e.costRecovery, cls: "bg-cost-recovery" },
                    { label: "Gross Split", v: e.grossSplit, cls: "bg-gross-split" },
                  ].map((row, i) => (
                    <div key={row.label} className="mt-2 grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-3 text-caption">
                      <span className="text-ink-2">{row.label}</span>
                      <span className="h-3 rounded-sm bg-paper-2">
                        <motion.span
                          className={cn("block h-full origin-left rounded-sm", row.cls)}
                          style={{ width: `${(row.v / maxEv) * 100}%` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={inView}
                          transition={{ duration: duration.slow, ease: ease.out, delay: i * 0.12 }}
                        />
                      </span>
                      <span className="text-right font-mono tabular">~{row.v.toLocaleString("en-US")}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <SourceNote approximate className="text-ink-2">
            {evidence.source}. Contractor cumulative discounted cashflow at 2039.
          </SourceNote>
        </Reveal>
      </div>
    </Section>
  );
}
