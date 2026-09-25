"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Section, Reveal } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { fieldToValue } from "@/data/economic-case-study";

type Step = (typeof fieldToValue)[number];

function Node({ step, index }: { step: Step; index: number }) {
  return (
    <Reveal as="li" delay={0.05} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-12 md:grid-cols-[3rem_1fr_1fr] md:gap-x-8">
      <span
        aria-hidden
        className={cn(
          "relative z-10 grid size-10 place-items-center rounded-full border bg-bg font-mono text-[0.72rem] tabular md:size-12",
          step.mine ? "border-accent text-accent" : "border-line-strong text-text-3",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className={cn("font-display text-h3", step.mine ? "text-text" : "text-text-2")}>{step.step}</h3>
        <p className="mt-1 text-text-2">{step.question}</p>
      </div>
      <div className="col-start-2 mt-3 md:col-start-3 md:mt-1">
        <p className="font-mono text-[0.8rem] leading-relaxed text-text">{step.fact}</p>
        <p className="mt-1 font-mono text-[0.68rem] tracking-wide text-text-3">{step.source}</p>
      </div>
    </Reveal>
  );
}

export function FieldToValue() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const technical = fieldToValue.filter((s) => !s.mine);
  const mine = fieldToValue.filter((s) => s.mine);

  return (
    <Section
      id="workflow"
      index="03"
      eyebrow="Field to value"
      tone="deep"
      title={
        <>
          Physical decisions become <em className="text-accent">financial outcomes.</em>
        </>
      }
      lede="The chain from rock to recommendation. The first four links are produced by the reservoir, drilling, production and facilities work. From cost onwards, the analysis is mine."
    >
      <div className="relative mt-16 md:mt-24">
        {/* spine: full track + scroll-driven fill */}
        <div aria-hidden className="absolute top-2 bottom-12 left-5 w-px bg-line md:left-6" />
        <motion.div aria-hidden style={{ scaleY: fill }} className="absolute top-2 bottom-12 left-5 w-px origin-top bg-accent md:left-6" />

        <ol ref={listRef} aria-label="From reservoir to investment decision">
          {technical.map((s, i) => (
            <Node key={s.step} step={s} index={i} />
          ))}
          <li className="relative mb-8 ml-14 md:ml-20">
            <p className="eyebrow flex items-center gap-3 text-accent">
              <span aria-hidden className="h-px w-8 bg-accent" />
              Economic analyst scope begins
            </p>
          </li>
          <li className="relative -ml-2 rounded-xl border border-accent/25 bg-accent-soft/40 pt-8 pl-2 md:-ml-3 md:pl-3">
            <ol>
              {mine.map((s, i) => (
                <Node key={s.step} step={s} index={technical.length + i} />
              ))}
            </ol>
          </li>
        </ol>
      </div>
    </Section>
  );
}
