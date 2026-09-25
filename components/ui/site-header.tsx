"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { sections, person } from "@/data/economic-case-study";

/** Fixed header: identity, current chapter, reading progress. */
export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(sections.findIndex((s) => s.id === e.target.id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = sections[Math.max(0, active)];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-[var(--blur-glass)]">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <a href="#hero" className="flex min-h-11 min-w-0 items-center gap-3 text-sm">
          <span aria-hidden className="grid size-6 place-items-center rounded-sm border border-accent/60 font-mono text-[0.65rem] text-accent">
            EA
          </span>
          <span className="truncate font-medium text-text">{person.name}</span>
          <span className="hidden text-text-3 sm:inline">— {person.role}</span>
        </a>
        <p className="shrink-0 font-mono text-[0.72rem] tracking-[0.12em] text-text-2 uppercase" aria-live="off">
          <span className="text-accent tabular">{String(Math.max(active, 0) + 1).padStart(2, "0")}</span>
          <span className="text-text-3"> / {String(sections.length).padStart(2, "0")}</span>
          <span className="ml-3 hidden md:inline">{current.label}</span>
        </p>
      </div>
      <motion.div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent" style={{ scaleX: progress }} />
    </header>
  );
}
