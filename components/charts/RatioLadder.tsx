"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { duration, ease, inView } from "@/lib/motion";

export interface LadderRow {
  label: string;
  a: string;
  b: string;
  multiple: number;
  group: "input" | "cost" | "value" | "time";
  note?: string;
}

const groupColor: Record<LadderRow["group"], string> = {
  input: "var(--text-2)",
  cost: "var(--cost)",
  value: "var(--scen-b)",
  time: "var(--scen-a)",
};

/**
 * B / A multiple per metric on one shared log-like scale (1× … 10×),
 * so "twice the wells" can be read against "1.8× the value".
 */
export function RatioLadder({ rows }: { rows: LadderRow[] }) {
  const max = 10;
  const pos = (m: number) => (Math.log10(Math.max(m, 1)) / Math.log10(max)) * 100;
  const ticks = [1, 2, 5, 10];

  return (
    <div className="mt-12" role="table" aria-label="Scenario B compared with Scenario A, as a multiple">
      <div role="row" className="hidden grid-cols-[minmax(11rem,1.3fr)_6rem_6rem_2.2fr] gap-x-6 border-b border-line pb-3 font-mono text-[0.7rem] tracking-[0.12em] text-text-3 uppercase md:grid">
        <span role="columnheader">Metric</span>
        <span role="columnheader" className="text-scen-a">A · 15 wells</span>
        <span role="columnheader" className="text-scen-b">B · 30 wells</span>
        <span role="columnheader" className="relative">
          B ÷ A
          <span aria-hidden className="absolute inset-x-0 top-5 hidden md:block">
            {ticks.map((t) => (
              <span key={t} className="absolute -translate-x-1/2 text-text-3" style={{ left: `${pos(t)}%` }}>
                {t}×
              </span>
            ))}
          </span>
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          role="row"
          key={r.label}
          className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-line py-5 md:grid-cols-[minmax(11rem,1.3fr)_6rem_6rem_2.2fr] md:items-center md:py-4"
        >
          <span role="rowheader" className="col-span-2 md:col-span-1">
            <span className="text-text">{r.label}</span>
            {r.note && <span className="block text-caption text-text-3">{r.note}</span>}
          </span>
          <span role="cell" className="font-mono text-[0.9rem] text-scen-a tabular">
            <span className="mr-2 text-text-3 md:hidden">A</span>
            {r.a}
          </span>
          <span role="cell" className="font-mono text-[0.9rem] text-scen-b tabular">
            <span className="mr-2 text-text-3 md:hidden">B</span>
            {r.b}
          </span>
          <span role="cell" className="relative col-span-2 flex h-7 items-center md:col-span-1">
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line" />
            {ticks.map((t) => (
              <span key={t} aria-hidden className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line-strong" style={{ left: `${pos(t)}%` }} />
            ))}
            <motion.span
              aria-hidden
              className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 origin-left rounded-full"
              style={{ width: `${Math.max(pos(r.multiple), 0.8)}%`, background: groupColor[r.group] }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 + i * 0.07 }}
            />
            <motion.span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 font-mono text-[0.85rem] tabular",
                // labels near the right end sit above the bar instead of past it
                pos(r.multiple) > 80 ? "-translate-x-full -translate-y-[140%] pr-1" : "pl-3",
              )}
              style={{ left: `${pos(r.multiple)}%`, color: groupColor[r.group] }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: duration.base, delay: 0.5 + i * 0.07 }}
            >
              {r.multiple.toFixed(r.multiple < 1.1 ? 2 : 1)}×
            </motion.span>
          </span>
        </div>
      ))}
    </div>
  );
}
