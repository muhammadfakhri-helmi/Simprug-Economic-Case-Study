# From Field Development to Investment Decision

An interactive case study of my role as **Economic Analyst** on the Simprug Field
integrated field development (Plan of Development): how reservoir, well,
production and facility assumptions become CAPEX, OPEX, fiscal take, cashflow,
NPV / IRR / DPI / POT / value creation — and finally an investment recommendation.

**Live site:** https://muhammadfakhri-helmi.github.io/Simprug-Economic-Case-Study/

> Academic capstone project · Team of 5 · My role: Economic Analyst · Presented to
> oil & gas industry professionals. Figures come from the team's final report;
> values read from report charts are marked as approximate on the site. The 3D
> field is a conceptual illustration, not a model of the real reservoir.

## What the page covers

1. Hero — 3D field: reservoir → producers → gathering → processing → sales
2. My role — five disciplines converging into economic decision support
3. Field to value — the physical-to-financial chain, with my scope marked
4. Development strategy — Scenario A (15 wells) vs B (30 wells) as B÷A multiples
5. Cost of development — CAPEX/OPEX by cost behaviour and A→B growth
6. Fiscal framework — PSC Cost Recovery vs Gross Split, with contractor-value evidence
7. Cashflow — the cashflow equation and cumulative discounted cashflow curves
8. Economic performance — NPV, value creation, IRR, DPI (vs hurdle) and POT
9. Sensitivity — revenue vs cost drivers as a tornado chart
10. Decision — Scenario B under Gross Split, with the 3D field showing the added wells
11. What it taught me — five capabilities linked back to the evidence

## Stack

Next.js (App Router, static export) · React · TypeScript · Tailwind CSS v4 ·
shadcn/ui (Button, Tooltip) · Motion (Framer Motion) · React Three Fiber ·
Three.js · @react-three/drei. Charts are small custom SVG/HTML components.
Fonts: Instrument Serif, Geist, Geist Mono via `next/font`.

## Run

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run build` writes a static site to `out/`. Quality gates:

```bash
npm run lint && npm run typecheck && npm run check
```

`npm run check` fails on raw documents (the source PDF), absolute local paths,
private links, secrets and — if a local, git-ignored `.privacy-terms.local.txt`
exists — any listed identifier (team members' names, student IDs).
`npm run check:dist` also scans `out/`.

## Structure

```
app/                     layout, page, global design tokens (globals.css), icon
components/sections/     one component per story section
components/charts/       RatioLadder, JCurve, Tornado
components/three/        FieldStage (lazy loader), FieldScene, Reservoir, Wells,
                         SurfaceFacilities, FlowLines, field-layout, SVG fallback
components/ui/           Section shell, header, providers, shadcn primitives
data/economic-case-study.ts   every figure, with its report source
lib/motion.ts            shared motion tokens (UI and 3D)
docs/                    design doc, design system, content sources
scripts/check.mjs        privacy / hygiene check
```

## 3D performance and accessibility

The Three.js chunk loads only on the client and only when the stage scrolls
into view; the render loop pauses off screen; DPR ≤ 1.5 with `AdaptiveDpr` and a
`PerformanceMonitor` that reduces particles on slow GPUs; wellheads and bores are
instanced. Without WebGL an SVG fallback is shown. `prefers-reduced-motion`
stops the sway and particle flow and shows every scene in its final state.
All content is semantic HTML; charts have text alternatives and source notes.

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` runs lint, type-check and the privacy
check, builds with `BASE_PATH=/<repository>`, re-checks `out/`, and deploys with
the official Pages actions. Repository → Settings → Pages → Source: GitHub Actions.

## License

Code: MIT. Case-study content summarises a team academic project.
