"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, Reveal } from "@/components/ui/section";
import { capabilities } from "@/data/economic-case-study";

export function Reflection() {
  return (
    <Section id="reflection" index="11" eyebrow="What this project taught me" tone="deep" title="Capabilities, shown — not claimed.">
      <ol className="mt-16 border-t border-line">
        {capabilities.map((c, i) => (
          <Reveal as="li" key={c.name} delay={i * 0.05}>
            <a
              href={c.href}
              className="group grid gap-2 border-b border-line py-8 transition-colors hover:bg-surface/40 md:grid-cols-[4rem_1.2fr_2fr_2rem] md:items-baseline md:gap-8 md:px-2"
            >
              <span className="font-mono text-[0.75rem] text-text-3 tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.3rem)] leading-tight group-hover:text-accent">{c.name}</span>
              <span className="text-text-2">{c.evidence}</span>
              <ArrowUpRight aria-hidden className="hidden size-5 text-text-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block" />
            </a>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
