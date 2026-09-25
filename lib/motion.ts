import type { Transition, Variants } from "motion/react";

/**
 * Motion tokens shared by UI (motion) and 3D (R3F useFrame).
 * Keep in sync with --ease-* in app/globals.css.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.4,
};

export const transition = {
  base: { duration: duration.base, ease: ease.out } satisfies Transition,
  slow: { duration: duration.slow, ease: ease.out } satisfies Transition,
  cinematic: { duration: duration.cinematic, ease: ease.inOut } satisfies Transition,
};

/** Viewport options for whileInView reveals: once, slightly before fully visible. */
export const inView = { once: true, amount: 0.3 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition.slow },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition.slow },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Cubic-bezier evaluation for 3D easing, so R3F follows the same curve as the UI. */
export function bezier(t: number, [x1, y1, x2, y2]: readonly [number, number, number, number] = ease.out): number {
  // Newton–Raphson on x(t), then evaluate y(t).
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  let u = t;
  for (let i = 0; i < 6; i++) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const dx = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(dx) < 1e-6) break;
    u -= x / dx;
  }
  return ((ay * u + by) * u + cy) * u;
}
