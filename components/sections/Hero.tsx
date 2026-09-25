"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FieldStage } from "@/components/three/FieldStage";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/motion";
import { project, ratio, fiscalModels, scenarios } from "@/data/economic-case-study";

const facts = [
  { value: `${project.horizon.years} yrs`, label: "Evaluation horizon" },
  { value: `${scenarios.A.wells} vs ${scenarios.B.wells}`, label: "Producers compared" },
  { value: fiscalModels.grossSplit.name.replace("PSC ", ""), label: "Selected fiscal regime" },
  { value: `+${Math.round((ratio("npv10") - 1) * 100)}%`, label: "NPV@10%, Scenario B vs A" },
];

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-14">
      {/* 3D field: right side on desktop, below the text on mobile */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] md:block">
        <FieldStage mode="hero" label="Conceptual 3D field: an oil reservoir, 30 producing wells, a gathering network, a processing facility and a sales line." className="h-full w-full" />
        <div aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-bg to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-page relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-16 md:py-24">
        <motion.div variants={stagger(0.09, 0.1)} initial="hidden" animate="show" className="max-w-[48rem]">
          <motion.p variants={fadeUp} className="eyebrow mb-8">
            {project.name} · Integrated field development · Economic analysis
          </motion.p>
          <motion.h1 id="hero-title" variants={fadeUp} className="font-display text-display tracking-[-0.02em]">
            From field development
            <br />
            to <em className="text-accent">investment decision.</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-[36rem] text-lede text-text-2">
            An interactive case study of my role as an Economic Analyst in evaluating the commercial viability of an integrated oil &amp; gas field development.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <a href="#role" className={cn(buttonVariants(), "h-12 gap-2 rounded-md px-6 text-[0.95rem]")}>
              Explore the analysis <ArrowDown aria-hidden />
            </a>
            <a
              href="#workflow"
              className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 rounded-md border-line-strong bg-transparent px-6 text-[0.95rem] hover:border-accent hover:text-accent")}
            >
              View economic workflow <ArrowRight aria-hidden />
            </a>
          </motion.div>
          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.75rem] tracking-wide text-text-3" aria-label="Project context">
            {project.context.map((c, i) => (
              <li key={c} className={cn(i === 2 && "text-text-2")}>
                {i > 0 && <span aria-hidden className="mr-4 text-line-strong">/</span>}
                {c}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* mobile 3D */}
        <div className="relative -mx-5 mt-12 h-[52svh] md:hidden">
          <FieldStage mode="hero" label="Conceptual 3D field: reservoir, producing wells, gathering network, processing and sales." className="h-full w-full" />
        </div>

        <motion.dl
          variants={stagger(0.07, 0.6)}
          initial="hidden"
          animate="show"
          className="mt-12 grid max-w-[46rem] grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4"
        >
          {facts.map((f) => (
            <motion.div key={f.label} variants={fadeUp} className="flex flex-col-reverse border-b border-line py-5 pr-4 md:border-b-0">
              <dt className="mt-1 text-caption text-text-3">{f.label}</dt>
              <dd className="font-display text-[2rem] leading-none text-text tabular">{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
