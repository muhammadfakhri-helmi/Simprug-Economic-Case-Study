"use client";

import { MotionConfig } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";

/** Global motion policy: follow the OS reduced-motion setting everywhere. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delay={150}>{children}</TooltipProvider>
    </MotionConfig>
  );
}
