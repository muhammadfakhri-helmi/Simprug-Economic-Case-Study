"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, inView, stagger } from "@/lib/motion";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "dark" | "deep" | "paper";
  className?: string;
  headerClassName?: string;
  children?: React.ReactNode;
}

/**
 * Section shell: numbered eyebrow, serif headline, optional lede.
 * Tone switches the surface; "paper" is the single light editorial band.
 */
export function Section({ id, index, eyebrow, title, lede, tone = "dark", className, headerClassName, children }: SectionProps) {
  const paper = tone === "paper";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative scroll-mt-16 py-24 md:py-36",
        tone === "deep" && "bg-bg-deep",
        paper && "on-paper bg-paper text-ink",
        className,
      )}
    >
      <div className="container-page">
        <motion.header
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className={cn("max-w-[52rem]", headerClassName)}
        >
          <motion.p variants={fadeUp} className={cn("eyebrow mb-6 flex items-baseline gap-3", paper && "text-ink-2")}>
            <span className={cn("text-accent", paper && "text-[#0b6c86]")}>{index}</span>
            <span aria-hidden className={cn("h-px w-8 translate-y-[-3px] bg-line-strong", paper && "bg-line-paper")} />
            {eyebrow}
          </motion.p>
          <motion.h2
            id={`${id}-title`}
            variants={fadeUp}
            className="font-display text-h2 tracking-[-0.01em] text-balance"
          >
            {title}
          </motion.h2>
          {lede && (
            <motion.p variants={fadeUp} className={cn("mt-6 max-w-prose text-lede text-text-2", paper && "text-ink-2")}>
              {lede}
            </motion.p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  );
}

/** Fade-up reveal for any block. */
export function Reveal({ children, className, delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "p" }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: fadeUp.hidden, show: { ...(fadeUp.show as object), transition: { ...(fadeUp.show as { transition: object }).transition, delay } } }}
    >
      {children}
    </Comp>
  );
}

/** Small "source" footnote shown under visuals. */
export function SourceNote({ children, approximate, className }: { children: React.ReactNode; approximate?: boolean; className?: string }) {
  return (
    <p className={cn("mt-4 font-mono text-[0.72rem] leading-relaxed tracking-wide text-text-3", className)}>
      {approximate && <span className="mr-2 rounded-sm border border-current px-1.5 py-px">Approx. — read from report chart</span>}
      Source: {children}
    </p>
  );
}
