/**
 * Single source of content for the case study.
 *
 * Every figure comes from the project's final Plan of Development report
 * (Simprug Field, Jan 2024). `source` cites the table / figure / page.
 * Values read off report charts are marked `approximate: true` and are
 * labelled as such wherever they are shown.
 */

export type ScenarioId = "A" | "B";

export interface Sourced<T> {
  value: T;
  source: string;
  approximate?: boolean;
}

export const project = {
  name: "Simprug Field",
  title: "Integrated Field Development — Plan of Development",
  basin: "North West Java Basin, onshore",
  reservoir: "Black-oil reservoir, solution-gas / fluid-expansion drive",
  horizon: { years: 20, start: 2019, end: 2039, source: "Section 4.1.2 / 8, pp. 30, 67" },
  discountRate: { value: 0.1, source: "Section 8.3, p. 71" },
  context: [
    "Academic capstone project",
    "Team of 5",
    "My role: Economic Analyst",
    "Presented to oil & gas industry professionals",
  ],
} as const;

export const person = {
  name: "Muhammad Fakhri Helmi",
  role: "Economic Analyst",
  discipline: "Petroleum Engineering",
} as const;

/** Scope of the economics workstream, grouped for the Role section. */
export const roleScope = [
  {
    cluster: "Inputs",
    question: "What will the field produce, and when?",
    items: ["Production & development assumptions", "Timing of value from production", "Development scenario evaluation"],
  },
  {
    cluster: "Cost",
    question: "What does it take to build and run?",
    items: ["CAPEX analysis", "OPEX analysis", "Development budget"],
  },
  {
    cluster: "Fiscal",
    question: "How is value shared with the state?",
    items: ["Fiscal-system analysis", "PSC Cost Recovery", "PSC Gross Split", "Revenue analysis"],
  },
  {
    cluster: "Value",
    question: "Is it worth the capital?",
    items: ["Project cashflow", "NPV · IRR · POT · DPI", "Value creation", "Sensitivity analysis", "Scenario comparison & recommendation"],
  },
] as const;

export const disciplines = [
  { name: "Reservoir Engineering", gives: "Oil in place, recovery, scenario design" },
  { name: "Production Engineering", gives: "Well performance, artificial lift" },
  { name: "Drilling", gives: "Well design and drilling cost basis" },
  { name: "Facilities", gives: "Separation, storage, flowline network" },
  { name: "Commercial Strategy", gives: "Fiscal terms and investment criteria" },
] as const;

export const decisionOutputs = ["Development scenario", "Fiscal framework", "Investment recommendation"] as const;

/** Section 03 — the physical-to-financial chain. `mine` marks the economics scope. */
export const fieldToValue = [
  { step: "Reservoir", question: "How much oil could be there?", fact: "905.6 MMSTB original oil in place (reservoir simulation model)", source: "Executive summary, p. 7", mine: false },
  { step: "Wells", question: "How many producers, and when?", fact: "15 or 30 producers, drilled in phases 2022–2024", source: "Tables 4.3–4.4, pp. 33–36", mine: false },
  { step: "Production", question: "How much can be recovered?", fact: "Recovery factor 12.9% (A) vs 21.6% (B)", source: "Table 4.5, p. 38", mine: false },
  { step: "Facilities", question: "What must be built to handle it?", fact: "50,000 bbl/d separation, 6.8 km flowline, ESP lift", source: "Executive summary, p. 7", mine: false },
  { step: "CAPEX & OPEX", question: "What does it cost to build and run?", fact: "Drilling, flowlines, surface facilities, crew, workover, ESP", source: "Table 8.2, pp. 70–71", mine: true },
  { step: "Fiscal terms", question: "Who takes which share?", fact: "Gross Split: base 43% contractor / 57% government", source: "Section 8.1, p. 69", mine: true },
  { step: "Cashflow", question: "When does money come back?", fact: "20-year horizon, 2019–2039, discounted at 10%", source: "Sections 4.1.2 & 8.3", mine: true },
  { step: "NPV · IRR · DPI · POT", question: "Is the value worth the capital?", fact: "Both scenarios clear the DPI hurdle of 1.6", source: "Section 8.3, p. 74", mine: true },
  { step: "Investment decision", question: "Which development should be backed?", fact: "Scenario B, under Gross Split", source: "Section 9, pp. 78–79", mine: true },
] as const;

export interface Scenario {
  id: ScenarioId;
  name: string;
  wells: number;
  description: string;
  recoveryFactorPct: Sourced<number>;
  cumulativeOilMMSTB: Sourced<number>;
  peakOilRateBopd: Sourced<number>;
  metrics: {
    npv10: Sourced<number>;
    irrPct: Sourced<number>;
    dpi: Sourced<number>;
    potYears: Sourced<number>;
    valueCreation: Sourced<number>;
  };
}

export const scenarios: Record<ScenarioId, Scenario> = {
  A: {
    id: "A",
    name: "Scenario A",
    wells: 15,
    description: "Base case + 12 new producers (10 in 2022, 2 in 2023)",
    recoveryFactorPct: { value: 12.875, source: "Table 4.5, p. 38" },
    cumulativeOilMMSTB: { value: 116.73, source: "Table 4.5, p. 38" },
    peakOilRateBopd: { value: 25717.55, source: "Table 4.5, p. 38" },
    metrics: {
      npv10: { value: 12111.14, source: "Table 8.3, p. 74" },
      irrPct: { value: 52, source: "Table 8.3, p. 74" },
      dpi: { value: 6.95, source: "Table 8.3, p. 74" },
      potYears: { value: 3.29, source: "Table 8.3, p. 74" },
      valueCreation: { value: 13332.11, source: "Table 8.3, p. 74" },
    },
  },
  B: {
    id: "B",
    name: "Scenario B",
    wells: 30,
    description: "Scenario A + 15 producers (9 in 2023, 6 in 2024)",
    recoveryFactorPct: { value: 21.57, source: "Table 4.5, p. 38" },
    cumulativeOilMMSTB: { value: 195.55, source: "Table 4.5, p. 38" },
    peakOilRateBopd: { value: 51572.77, source: "Table 4.5, p. 38" },
    metrics: {
      npv10: { value: 21595.53, source: "Table 8.4, p. 74" },
      irrPct: { value: 57, source: "Table 8.4, p. 74" },
      dpi: { value: 9.2, source: "Table 8.4, p. 74" },
      potYears: { value: 3.36, source: "Table 8.4, p. 74" },
      valueCreation: { value: 23175.92, source: "Table 8.4, p. 74" },
    },
  },
};

export const dpiHurdle = { value: 1.6, source: "Section 8.3, p. 74" };

export const metricNotes = {
  unitNote: "NPV and Value Creation are shown as reported by the project economic model (contractor, Gross Split, 10% discount rate).",
  definitions: {
    npv10: "Present value of all future contractor cashflows, discounted at 10%.",
    irrPct: "Discount rate at which the project's NPV becomes zero.",
    dpi: "Discounted profitability index: discounted net return per unit of discounted investment.",
    potYears: "Pay out time: years until cumulative cashflow recovers the investment.",
    valueCreation: "Value added to the company by the development strategy.",
  },
} as const;

/**
 * Cost structure. The report's cost table mixes units, so the site shows how
 * each item behaves and how it grows from Scenario A to B (ratio of the two
 * table totals), not absolute amounts.
 */
export type CostBehaviour = "fixed" | "per-well" | "capacity";

export const costBehaviourLabels: Record<CostBehaviour, { title: string; body: string }> = {
  fixed: { title: "Fixed", body: "Same in both scenarios, regardless of well count." },
  "per-well": { title: "Scales with wells", body: "Grows in step with the number of producers." },
  capacity: { title: "Steps with capacity", body: "Jumps when throughput needs a larger network or plant." },
};

export const costs = {
  capex: [
    { item: "Exploration investment", behaviour: "fixed", growth: 1.0, source: "Table 8.2, p. 70" },
    { item: "Drilling & completion", behaviour: "per-well", growth: 2.0, source: "Table 8.2, p. 70" },
    { item: "Flowline network", behaviour: "capacity", growth: 3.3, source: "Table 8.2, p. 70" },
    { item: "Surface facilities", behaviour: "capacity", growth: 10.0, source: "Table 8.2, p. 71" },
  ],
  opex: [
    { item: "Crew", behaviour: "fixed", growth: 1.0, source: "Table 8.2, p. 71" },
    { item: "Field operations", behaviour: "fixed", growth: 1.0, source: "Table 8.2, p. 71" },
    { item: "Workover", behaviour: "per-well", growth: 2.0, source: "Table 8.2, p. 71" },
    { item: "ESP (artificial lift)", behaviour: "per-well", growth: 2.0, source: "Table 8.2, p. 71" },
  ],
} as const satisfies Record<string, ReadonlyArray<{ item: string; behaviour: CostBehaviour; growth: number; source: string }>>;

export const fiscalModels = {
  costRecovery: {
    name: "PSC Cost Recovery",
    steps: ["Gross revenue", "Contractor recovers eligible costs first", "Remaining profit is split"],
    contractorSharePct: 15,
    governmentSharePct: 85,
    shareNote: "Oil split after cost recovery (fourth-generation PSC terms used in the study)",
    strength: "Faster recovery of capital spent",
    source: "Section 8.1 A, p. 68",
  },
  grossSplit: {
    name: "PSC Gross Split",
    steps: ["Gross production", "Split immediately", "Contractor funds all costs from its share"],
    contractorSharePct: 43,
    governmentSharePct: 57,
    shareNote: "Base split, adjusted by variable and progressive components",
    variableComponents: ["Block status", "Field location", "Reservoir depth", "Infrastructure", "Reservoir condition", "CO₂ / H₂S content", "API gravity"],
    progressiveComponents: ["Local content", "Production phase", "Oil price"],
    strength: "Larger contractor share of production; simpler administration",
    source: "Section 8.1 B, pp. 69–70",
  },
  /** End-of-horizon contractor cumulative discounted cashflow, read from report charts. */
  evidence: {
    A: { costRecovery: 5500, grossSplit: 12350 },
    B: { costRecovery: 7500, grossSplit: 21200 },
    approximate: true,
    source: "Figures 8.3 and 8.5 (PSC vs Gross Split discounted 10% cashflow), pp. 72–73",
  },
  decision: {
    selected: "grossSplit",
    reasons: [
      "Gives the contractor a larger share of production to fund development.",
      "Simpler to administer than cost recovery.",
      "With high, sustained production and a stable oil price, the larger share outweighs cost recovery's faster capital payback.",
    ],
    source: "Section 8.3, p. 73",
  },
} as const;

/**
 * Cumulative discounted (10%) contractor cashflow under Gross Split, by year.
 * Read from report Figures 8.3 (A) and 8.5 (B); end points match the reported NPVs.
 */
export const cashflowCurve = {
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039],
  A: [-2000, -1700, -1450, -1100, 750, 2550, 4100, 5500, 6650, 7700, 8600, 9350, 10000, 10500, 10950, 11350, 11650, 11900, 12100, 12250, 12350],
  B: [-2600, -2300, -2000, -2150, -700, 2900, 6050, 8600, 10800, 12650, 14200, 15650, 16800, 17800, 18600, 19300, 19850, 20300, 20650, 20950, 21200],
  approximate: true,
  source: "Figures 8.3 and 8.5, pp. 72–73",
} as const;

/**
 * Sensitivity: change in contractor NPV for a ±30% change in each input,
 * computed from the labelled points of the report's NPV spider plot.
 * The plot legend is cropped, so the two cost lines are reported together.
 */
export const sensitivity = {
  inputChangePct: 30,
  drivers: [
    { name: "Revenue", detail: "Production volume × oil price", downPct: -47.7, upPct: 47.7, kind: "revenue" },
    { name: "Cost driver", detail: "CAPEX / OPEX (larger effect)", downPct: 15.4, upPct: -15.4, kind: "cost" },
    { name: "Cost driver", detail: "CAPEX / OPEX (smaller effect)", downPct: 2.3, upPct: -2.3, kind: "cost" },
  ],
  allCasesPositive: true,
  source: "Spider analysis, contractor NPV, Gross Split (Section 8.4, pp. 76–77)",
} as const;

export const recommendation = {
  development: {
    verdict: "Scenario B — 30 producers",
    reasons: [
      "NPV@10% 21,595.53 vs 12,111.14: +78% more value.",
      "DPI 9.20 vs 6.95 — both far above the 1.6 hurdle, B clearly higher.",
      "IRR 57% vs 52%, while pay out time moves only from 3.29 to 3.36 years.",
      "Highest recovery factor (21.6%), supported by the technical team's scenario analysis.",
    ],
  },
  fiscal: {
    verdict: "PSC Gross Split",
    reasons: fiscalModels.decision.reasons,
  },
  source: "Sections 8.3 and 9, pp. 73–79",
} as const;

export const capabilities = [
  { name: "Technical–economic integration", evidence: "Turned reservoir, drilling and facility assumptions into a single cashflow model.", href: "#workflow" },
  { name: "Capital allocation thinking", evidence: "Compared doubling the well count against a 10× facility step and the value it unlocked.", href: "#strategy" },
  { name: "Economic modelling", evidence: "Built 20-year contractor cashflows under two fiscal regimes and two scenarios.", href: "#cashflow" },
  { name: "Investment decision support", evidence: "Read NPV, IRR, DPI, POT and value creation together, not one metric in isolation.", href: "#performance" },
  { name: "Upstream commercial understanding", evidence: "Explained why Gross Split beat Cost Recovery for this field's production profile.", href: "#fiscal" },
] as const;

export const sections = [
  { id: "hero", label: "Overview" },
  { id: "role", label: "My role" },
  { id: "workflow", label: "Field to value" },
  { id: "strategy", label: "Development strategy" },
  { id: "cost", label: "Cost of development" },
  { id: "fiscal", label: "Fiscal framework" },
  { id: "cashflow", label: "Cashflow" },
  { id: "performance", label: "Economic performance" },
  { id: "sensitivity", label: "Sensitivity" },
  { id: "decision", label: "Decision" },
  { id: "reflection", label: "What it taught me" },
] as const;

/** Helpers */
export const ratio = (key: keyof Scenario["metrics"]) => scenarios.B.metrics[key].value / scenarios.A.metrics[key].value;
