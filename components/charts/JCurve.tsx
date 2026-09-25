"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cashflowCurve, scenarios } from "@/data/economic-case-study";
import { duration, ease, inView } from "@/lib/motion";

const Y_MIN = -4000;
const Y_MAX = 24000;

/** Chart geometry. A narrower viewBox on phones keeps 11px labels readable. */
function geometry(compact: boolean) {
  const W = compact ? 400 : 760;
  const H = compact ? 300 : 360;
  const P = compact ? { l: 34, r: 78, t: 14, b: 30 } : { l: 56, r: 96, t: 16, b: 34 };
  const x = (i: number) => P.l + (i / (cashflowCurve.years.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - P.t - P.b);
  const pathFor = (values: readonly number[]) => values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return { W, H, P, x, y, pathFor };
}

/** First year where cumulative discounted cashflow turns positive. */
function payback(values: readonly number[]) {
  return values.findIndex((v) => v > 0);
}

/** Cumulative discounted contractor cashflow — the "J-curve" of each scenario. */
export function JCurve() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const { W, H, P, x, y, pathFor } = geometry(compact);
  const series = [
    { id: "A" as const, values: cashflowCurve.A, color: "var(--scen-a)", npv: scenarios.A.metrics.npv10.value },
    { id: "B" as const, values: cashflowCurve.B, color: "var(--scen-b)", npv: scenarios.B.metrics.npv10.value },
  ];
  const desc = `Cumulative discounted contractor cashflow under Gross Split, 2019 to 2039. Both scenarios start negative while wells and facilities are built, turn positive in ${cashflowCurve.years[payback(cashflowCurve.A)]} (A) and ${cashflowCurve.years[payback(cashflowCurve.B)]} (B), and end near the reported NPV at 10%: ${scenarios.A.metrics.npv10.value.toLocaleString()} for A and ${scenarios.B.metrics.npv10.value.toLocaleString()} for B.`;

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-labelledby="jcurve-title jcurve-desc">
        <title id="jcurve-title">Cumulative discounted cashflow, Scenario A and B</title>
        <desc id="jcurve-desc">{desc}</desc>

        {[0, 5000, 10000, 15000, 20000].map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke={v === 0 ? "var(--line-strong)" : "var(--line)"} strokeDasharray={v === 0 ? undefined : "2 5"} />
            <text x={P.l - 10} y={y(v) + 4} textAnchor="end" className="fill-text-3 font-mono text-[11px]">
              {v === 0 ? "0" : `${v / 1000}k`}
            </text>
          </g>
        ))}
        {cashflowCurve.years.map((yr, i) =>
          i % (compact ? 5 : 4) === 0 || i === cashflowCurve.years.length - 1 ? (
            <text key={yr} x={x(i)} y={H - 10} textAnchor="middle" className="fill-text-3 font-mono text-[11px]">
              {yr}
            </text>
          ) : null,
        )}

        {/* investment phase band */}
        <rect x={x(0)} y={y(0)} width={x(4) - x(0)} height={y(Y_MIN) - y(0)} fill="var(--cost)" opacity={0.07} />
        <text x={x(0) + 6} y={y(Y_MIN) - 8} className="fill-cost font-mono text-[10px] tracking-[0.1em]">
          BUILD-OUT
        </text>

        {series.map((s, si) => {
          const pb = payback(s.values);
          const last = s.values.length - 1;
          return (
            <g key={s.id}>
              <motion.path
                d={pathFor(s.values)}
                fill="none"
                stroke={s.color}
                strokeWidth={2.4}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={inView}
                transition={{ duration: duration.cinematic * 1.2, ease: ease.inOut, delay: si * 0.25 }}
              />
              <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={inView} transition={{ delay: 1.2 + si * 0.25 }}>
                <circle cx={x(pb)} cy={y(s.values[pb])} r={4} fill="var(--bg)" stroke={s.color} strokeWidth={2} />
                <circle cx={x(last)} cy={y(s.values[last])} r={4} fill={s.color} />
                <text x={x(last) + 10} y={y(s.values[last]) + 4} className="font-mono text-[12px]" fill={s.color}>
                  {s.id} ≈ {Math.round(s.values[last]).toLocaleString("en-US")}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">{desc}</figcaption>
    </figure>
  );
}
