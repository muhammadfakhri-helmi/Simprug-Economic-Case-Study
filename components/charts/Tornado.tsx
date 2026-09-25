"use client";

import { motion } from "motion/react";
import { sensitivity } from "@/data/economic-case-study";
import { duration, ease, inView } from "@/lib/motion";

/**
 * Tornado view of the report's NPV spider plot: for a ±30% change in each
 * input, how far does contractor NPV move? Bars grow outward from the base case.
 */
export function Tornado() {
  const span = 60; // ±60% axis
  const pos = (pct: number) => 50 + (pct / span) * 50;

  return (
    <div role="table" aria-label={`Change in contractor NPV for a ${sensitivity.inputChangePct}% change in each input`}>
      <div role="row" className="hidden grid-cols-[minmax(8rem,12rem)_1fr] gap-6 pb-3 font-mono sm:grid text-[0.68rem] tracking-[0.12em] text-text-3 uppercase">
        <span role="columnheader">Input ±{sensitivity.inputChangePct}%</span>
        <span role="columnheader" className="flex justify-between">
          <span>NPV falls</span>
          <span>base</span>
          <span>NPV rises</span>
        </span>
      </div>
      {sensitivity.drivers.map((d, i) => {
        const lo = Math.min(d.downPct, d.upPct);
        const hi = Math.max(d.downPct, d.upPct);
        const revenue = d.kind === "revenue";
        return (
          <div role="row" key={d.detail} className="grid items-center gap-3 border-t border-line py-6 sm:grid-cols-[minmax(8rem,12rem)_1fr] sm:gap-6">
            <div role="rowheader">
              <p className={revenue ? "font-display text-h3 text-[#e0ae62]" : "font-display text-h3 text-text-2"}>{d.name}</p>
              <p className="text-caption text-text-3">{d.detail}</p>
            </div>
            <div role="cell" className="relative mx-14 h-12 sm:mx-12">
              <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-line-strong" />
              {[-50, -25, 25, 50].map((t) => (
                <span key={t} aria-hidden className="absolute inset-y-3 w-px bg-line" style={{ left: `${pos(t)}%` }} />
              ))}
              <motion.span
                aria-hidden
                className="absolute top-1/2 h-5 -translate-y-1/2 rounded-sm"
                style={{
                  left: `${pos(lo)}%`,
                  width: `${pos(hi) - pos(lo)}%`,
                  background: revenue ? "linear-gradient(90deg, #8a5a2b, #e0ae62)" : "var(--cost)",
                  opacity: revenue ? 1 : 0.75,
                  transformOrigin: "center",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inView}
                transition={{ duration: duration.slow, ease: ease.out, delay: i * 0.15 }}
              />
              <span className="absolute top-1/2 -translate-x-[calc(100%+8px)] -translate-y-1/2 font-mono text-[0.75rem] text-text-2 tabular" style={{ left: `${pos(lo)}%` }}>
                {lo > 0 ? "+" : ""}
                {lo.toFixed(1)}%
              </span>
              <span className="absolute top-1/2 translate-x-2 -translate-y-1/2 font-mono text-[0.75rem] text-text-2 tabular" style={{ left: `${pos(hi)}%` }}>
                +{hi.toFixed(1)}%
              </span>
              <span className="sr-only">
                NPV changes between {lo.toFixed(1)}% and +{hi.toFixed(1)}%.
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
