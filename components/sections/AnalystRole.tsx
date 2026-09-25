"use client";

import { motion } from "motion/react";
import { Section, Reveal } from "@/components/ui/section";
import { decisionOutputs, disciplines, roleScope } from "@/data/economic-case-study";
import { duration, ease, inView } from "@/lib/motion";

/** Curves from n evenly spaced rows on one side to m rows on the other. */
function Connectors({ from, to, flip = false }: { from: number; to: number; flip?: boolean }) {
  const paths: string[] = [];
  for (let i = 0; i < from; i++) {
    for (let j = 0; j < to; j++) {
      const y1 = ((i + 0.5) / from) * 100;
      const y2 = ((j + 0.5) / to) * 100;
      paths.push(flip ? `M0 ${y2} C50 ${y2} 50 ${y1} 100 ${y1}` : `M0 ${y1} C50 ${y1} 50 ${y2} 100 ${y2}`);
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-full w-full md:block">
      {paths.map((d, k) => (
        <motion.path
          key={k}
          d={d}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.35}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={inView}
          transition={{ duration: duration.cinematic, ease: ease.inOut, delay: 0.2 + k * 0.06 }}
        />
      ))}
    </svg>
  );
}

export function AnalystRole() {
  return (
    <Section
      id="role"
      index="02"
      eyebrow="My role"
      title="What did I actually analyze?"
      lede="Every discipline in the team produced assumptions. My job was to turn all of them into one answer: is this development worth the capital it needs — and in which form?"
    >
      {/* convergence diagram */}
      <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-[1fr_8rem_minmax(14rem,1fr)_8rem_1fr] md:items-stretch md:gap-0">
        <ul className="grid gap-3" aria-label="Disciplines feeding the economic model">
          {disciplines.map((d, i) => (
            <Reveal as="li" key={d.name} delay={i * 0.06} className="border-l border-line-strong py-2 pl-4">
              <p className="font-medium text-text">{d.name}</p>
              <p className="text-caption text-text-3">{d.gives}</p>
            </Reveal>
          ))}
        </ul>
        <Connectors from={disciplines.length} to={1} />
        <Reveal delay={0.3} className="flex items-center">
          <div className="relative w-full rounded-lg border border-accent/40 bg-accent-soft px-6 py-8 text-center shadow-[var(--shadow-panel)]">
            <p className="eyebrow mb-3 text-accent">Economic analyst</p>
            <p className="font-display text-h3 leading-tight">Economic decision support</p>
            <p className="mt-3 text-caption text-text-2">Cost, fiscal terms, cashflow and risk in one model</p>
          </div>
        </Reveal>
        <Connectors from={decisionOutputs.length} to={1} flip />
        <ul className="grid content-center gap-3" aria-label="Decisions supported">
          {decisionOutputs.map((o, i) => (
            <Reveal as="li" key={o} delay={0.5 + i * 0.08} className="border-l border-accent py-2 pl-4">
              <p className="font-medium text-text">{o}</p>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* scope */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <p className="eyebrow mb-8">Full economics scope</p>
        </Reveal>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {roleScope.map((c, i) => (
            <Reveal key={c.cluster} delay={i * 0.08} className="border-t border-line-strong pt-5">
              <p className="font-mono text-[0.72rem] tracking-[0.14em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")} · {c.cluster}
              </p>
              <p className="mt-3 font-display text-[1.6rem] leading-tight text-text">{c.question}</p>
              <ul className="mt-5 space-y-2 text-text-2">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.95rem]">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
