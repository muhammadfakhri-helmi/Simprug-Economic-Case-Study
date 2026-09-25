"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { FieldFallback } from "./FieldFallback";

const FieldScene = dynamic(() => import("./FieldScene"), {
  ssr: false,
  loading: () => <StageLoading />,
});

function StageLoading() {
  return (
    <div className="absolute inset-0 grid place-items-center" role="status">
      <span className="font-mono text-[0.72rem] tracking-[0.14em] text-text-3 uppercase">Building field model…</span>
    </div>
  );
}

/** Chain legend over the scene: what the particles and colours mean. */
function FieldLegend({ mode }: { mode: "hero" | "decision" }) {
  const steps = ["Reservoir", "Producers", "Gathering", "Processing", "Sales"];
  return (
    <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex flex-wrap items-center justify-end gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.12em] text-text-3 uppercase md:right-8 md:bottom-8">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          <span className={i === 0 ? "text-[#e0ae62]" : i === steps.length - 1 ? "text-accent" : "text-text-2"}>{s}</span>
          {i < steps.length - 1 && <span aria-hidden className="h-px w-4 bg-line-strong" />}
        </span>
      ))}
      <span className="ml-3 flex items-center gap-2 border-l border-line pl-3">
        <span aria-hidden className="size-1.5 rounded-full bg-[#e0ae62]" /> oil
        <span aria-hidden className="ml-2 size-1.5 rounded-full bg-accent" /> value
        {mode === "decision" && (
          <>
            <span aria-hidden className="ml-2 size-1.5 rounded-full bg-scen-a" /> A wells
            <span aria-hidden className="ml-2 size-1.5 rounded-full bg-scen-b" /> added in B
          </>
        )}
      </span>
    </div>
  );
}

let webglCache: boolean | undefined;
function hasWebGL() {
  if (webglCache === undefined) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

const noopSubscribe = () => () => {};
const MOBILE_QUERY = "(max-width: 767px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Lazy 3D stage. The Three.js chunk loads only on the client, the render loop
 * runs only while the stage is on screen, and devices without WebGL get an SVG.
 */
export function FieldStage({ mode, className, label }: { mode: "hero" | "decision"; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [seen, setSeen] = useState(false);
  // null during static prerender; resolved on the client without a render cascade
  const webgl = useSyncExternalStore(noopSubscribe, hasWebGL, () => null);
  const mobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches, () => false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      setActive(e.isIntersecting);
      if (e.isIntersecting) setSeen(true);
    }, { rootMargin: "120px 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} role="img" aria-label={label} className={cn("relative", className)}>
      {webgl === false ? (
        <FieldFallback mode={mode} />
      ) : seen && webgl ? (
        <FieldScene mode={mode} active={active} reducedMotion={reduced} mobile={mobile} />
      ) : (
        <StageLoading />
      )}
      <FieldLegend mode={mode} />
    </div>
  );
}
