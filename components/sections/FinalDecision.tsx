"use client";

import { motion } from "motion/react";
import { Section, Reveal, SourceNote } from "@/components/ui/section";
import { FieldStage } from "@/components/three/FieldStage";
import { recommendation } from "@/data/economic-case-study";
import { fadeUp, inView, stagger } from "@/lib/motion";

function Verdict({ label, verdict, reasons, accent }: { label: string; verdict: string; reasons: readonly string[]; accent: string }) {
  return (
    <motion.article variants={fadeUp} className="border-t-2 pt-6" style={{ borderColor: accent }}>
      <p className="eyebrow">{label}</p>
      <h3 className="mt-3 font-display text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-none" style={{ color: accent }}>
        {verdict}
      </h3>
      <ul className="mt-6 space-y-3">
        {reasons.map((r) => (
          <li key={r} className="flex gap-3 text-text-2">
            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0" style={{ background: accent }} />
            {r}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function FinalDecision() {
  return (
    <Section
      id="decision"
      index="10"
      eyebrow="Decision"
      title={
        <>
          Develop the larger field. <em className="text-accent">Under Gross Split.</em>
        </>
      }
      lede="The technical case said Scenario B recovers the most oil. The economic case had to show that the extra wells, flowlines and plant would repay themselves — and under which contract. Both answers pointed the same way."
    >
      <Reveal className="relative mt-14 h-[56svh] min-h-[22rem] overflow-hidden rounded-2xl border border-line bg-bg-deep md:h-[68svh]">
        <FieldStage
          mode="decision"
          label="3D field with the 15 Scenario A wells in blue and the 15 additional Scenario B wells appearing in cyan."
          className="h-full w-full"
        />
        <p className="absolute top-5 left-5 font-mono text-[0.72rem] tracking-[0.12em] text-text-2 uppercase md:top-8 md:left-8">
          Scenario B · 30 producers
        </p>
      </Reveal>

      <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={inView} className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Verdict label="Selected development" verdict={recommendation.development.verdict} reasons={recommendation.development.reasons} accent="var(--scen-b)" />
        <Verdict label="Selected economic framework" verdict={recommendation.fiscal.verdict} reasons={recommendation.fiscal.reasons} accent="var(--gross-split)" />
      </motion.div>
      <SourceNote>{recommendation.source}.</SourceNote>

      <Reveal className="mx-auto mt-28 max-w-[58rem] text-center">
        <p className="font-display text-[clamp(2rem,1.2rem+3vw,3.75rem)] leading-[1.08] text-balance">
          Technical potential becomes <em className="text-accent">investment value</em> only when someone can show the numbers behind it.
        </p>
      </Reveal>
    </Section>
  );
}
