"use client";

import { motion } from "motion/react";
import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { costBehaviourLabels, costs, type CostBehaviour } from "@/data/economic-case-study";
import { cn } from "@/lib/utils";
import { duration, ease, inView } from "@/lib/motion";

const behaviours: CostBehaviour[] = ["fixed", "per-well", "capacity"];
const logPos = (m: number) => (Math.log10(Math.max(m, 1)) / 1) * 100; // 1× … 10×

function GrowthBar({ growth }: { growth: number }) {
  return (
    <div className="mt-3">
      <div className="relative h-1.5 rounded-full bg-line" aria-hidden>
        <motion.div
          className="absolute inset-y-0 left-0 origin-left rounded-full bg-cost"
          style={{ width: `${Math.max(logPos(growth), 3)}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inView}
          transition={{ duration: duration.slow, ease: ease.out }}
        />
      </div>
      <p className="mt-1.5 flex justify-between font-mono text-[0.7rem] text-text-3">
        <span>A → B</span>
        <span className={cn("tabular", growth > 1 ? "text-cost" : "text-text-3")}>{growth === 1 ? "unchanged" : `×${growth.toFixed(1)}`}</span>
      </p>
    </div>
  );
}

function Matrix({ title, subtitle, items }: { title: string; subtitle: string; items: ReadonlyArray<{ item: string; behaviour: CostBehaviour; growth: number }> }) {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-line-strong pb-4">
        <h3 className="font-display text-h3">{title}</h3>
        <p className="font-mono text-[0.72rem] tracking-[0.12em] text-text-3 uppercase">{subtitle}</p>
      </div>
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {behaviours.map((b) => {
          const list = items.filter((i) => i.behaviour === b);
          return (
            <div key={b} className="bg-bg p-5 sm:min-h-[15rem]">
              <p className="font-mono text-[0.72rem] tracking-[0.12em] text-accent uppercase">{costBehaviourLabels[b].title}</p>
              <p className="mt-1 text-caption text-text-3">{costBehaviourLabels[b].body}</p>
              <ul className="mt-5 space-y-5">
                {list.length === 0 && <li className="text-caption text-text-3 italic">None in this category</li>}
                {list.map((i) => (
                  <Reveal as="li" key={i.item}>
                    <p className="text-text">{i.item}</p>
                    <GrowthBar growth={i.growth} />
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CostStructure() {
  return (
    <Section
      id="cost"
      index="05"
      eyebrow="Cost of development"
      title="Where the money goes — and what makes it grow."
      lede="The raw cost table mixes units, so the useful question is not the totals but how each cost behaves when the development scales from 15 to 30 wells."
    >
      <div className="mt-16 grid gap-16 xl:grid-cols-2 xl:gap-10">
        <Reveal>
          <Matrix title="CAPEX" subtitle="Capital deployment" items={costs.capex} />
        </Reveal>
        <Reveal delay={0.1}>
          <Matrix title="OPEX" subtitle="Keeping the field producing" items={costs.opex} />
        </Reveal>
      </div>
      <SourceNote>Table 8.2 (Rincian Pengeluaran), pp. 70–71. Bars show the ratio of Scenario B to Scenario A totals on a log scale (1×–10×).</SourceNote>

      <Reveal className="mt-16 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <p className="eyebrow pt-2">Reading</p>
        <div className="space-y-4 text-lede text-text-2">
          <p>
            <span className="text-text">CAPEX grows in steps; OPEX grows with wells.</span> Drilling, workover and ESP double with the well count, while the
            flowline network and surface plant jump to a new capacity class.
          </p>
          <p>
            Exploration, crew and field operations stay fixed — so in the larger development they are carried by roughly 1.7× the recovered oil.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
