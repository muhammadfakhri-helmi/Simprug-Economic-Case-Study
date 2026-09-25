import { SiteHeader } from "@/components/ui/site-header";
import { Hero } from "@/components/sections/Hero";
import { AnalystRole } from "@/components/sections/AnalystRole";
import { FieldToValue } from "@/components/sections/FieldToValue";
import { DevelopmentStrategy } from "@/components/sections/DevelopmentStrategy";
import { CostStructure } from "@/components/sections/CostStructure";
import { FiscalFramework } from "@/components/sections/FiscalFramework";
import { Cashflow } from "@/components/sections/Cashflow";
import { EconomicPerformance } from "@/components/sections/EconomicPerformance";
import { SensitivityAnalysis } from "@/components/sections/SensitivityAnalysis";
import { FinalDecision } from "@/components/sections/FinalDecision";
import { Reflection } from "@/components/sections/Reflection";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-accent px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <AnalystRole />
        <FieldToValue />
        <DevelopmentStrategy />
        <CostStructure />
        <FiscalFramework />
        <Cashflow />
        <EconomicPerformance />
        <SensitivityAnalysis />
        <FinalDecision />
        <Reflection />
      </main>
      <Footer />
    </>
  );
}
