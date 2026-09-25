# Simprug Field — Economic Analyst Case Study: Design

Date: 2026-09-25 · Status: approved by owner (build autonomously, publish to GitHub Pages)

## Goal

A recruiter or technical manager understands in 30–60 seconds that Fakhri was the
**Economic Analyst** of an integrated field development study and can translate
technical upstream assumptions into an investment decision.

Central line: **From field development to investment decision.**

## Framing (owner decision)

"Academic capstone project · Team of 5 · My role: Economic Analyst · Presented to
oil & gas industry professionals." No course name or code, no other team members'
names. The operator named in the report is fictional and is not named here.

## Narrative (11 parts)

| # | Section | Job | Primary visual |
| --- | --- | --- | --- |
| 01 | Hero | Role + promise in one screen | Procedural 3D field block diagram |
| 02 | Role | What an Economic Analyst connects | Five disciplines converging into decision support; four-cluster scope list |
| 03 | Field to value | The physical-to-financial chain | Scroll-filled vertical spine, 9 nodes, each with a question and one report fact; bracket marks my scope |
| 04 | Development strategy | Scale vs value, A (15) vs B (30) | Ratio ladder: B/A multiplier per metric |
| 05 | Cost of development | What drives CAPEX / OPEX | Cost-behaviour matrix (fixed / per well / capacity step) with A→B growth |
| 06 | Fiscal framework | Cost Recovery vs Gross Split, for non-economists | Two split-flow diagrams + contractor value evidence |
| 07 | Cashflow | Production × price − cost − government share | Typographic equation + cumulative discounted cashflow J-curves |
| 08 | Economic performance | NPV, IRR, DPI, POT, VC | Comparison scoreboard with hurdle line |
| 09 | Sensitivity | Revenue dominates | Redesigned tornado from the NPV spider plot |
| 10 | Decision | Scenario B + Gross Split, reasoned | 3D field returns with 30 wells; two reasoned verdicts |
| 11 | Reflection | Capabilities, not soft skills | Five capabilities linked to evidence sections |

3D appears only in 01 and 10 (owner choice). Section 03 carries the
physical-to-financial link in 2D.

## Content rules (portfolio mode)

- Every number lives in `data/economic-case-study.ts` with its report source.
- Values read from report charts are flagged `approximate` and labelled in the UI.
- The CAPEX/OPEX table mixes units, so only A→B ratios and cost behaviour are shown.
- The spider-plot legend is cropped in the report: revenue is identifiable (steepest,
  positive slope); the two cost lines are shown together as "CAPEX / OPEX".
- NPV / VC are shown without a currency unit, footnoted as model values.

## Visual system

Dark navy/slate base, off-white editorial band for the fiscal section, muted blue
(Scenario A), muted cyan (Scenario B), warm sand (Gross Split), copper (cost).
Instrument Serif for large storytelling lines, Geist for UI/body, Geist Mono for
figures and labels. Details in `docs/DESIGN_SYSTEM.md`.

## Architecture

Next.js App Router + TypeScript, `output: 'export'`, `basePath` from env for
GitHub Pages. Tailwind v4 tokens in `app/globals.css`. shadcn/ui (base-ui) only
for Button and Tooltip. `motion` for all UI motion with shared tokens in
`lib/motion.ts`; R3F `useFrame` uses the same easing curve. Charts are custom SVG
(small, fully styled, accessible) — Recharts would add weight for five simple charts.

3D: `components/three/FieldScene.tsx` loaded with `next/dynamic` (`ssr: false`),
procedural geometry, instanced wellheads, DPR ≤ 1.5, frameloop paused when off
screen, reduced detail on mobile, SVG fallback without WebGL.

## Quality gates

`tsc`, `next build` (static export), headless screenshot tour at 1440/1024/390,
reduced-motion and no-WebGL runs, console check, number check against the report,
`npm run check` for local paths / raw documents / team-member names.
