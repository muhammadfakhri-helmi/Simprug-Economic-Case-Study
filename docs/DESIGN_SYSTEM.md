# Design system

Small on purpose. Tokens live in `app/globals.css` (`:root` + `@theme`) and
`lib/motion.ts`. Components use Tailwind classes that map to these tokens —
no one-off hex values except the oil gold `#e0ae62` used by the 3D scene,
sensitivity chart and legend (kept identical in all three).

## Visual direction

Digital twin × premium corporate analytics: a dark engineering environment for
the physical story, calm editorial analytics for the financial story, and one
off-white "report paper" band for the fiscal section where the reader has to
think hardest. No neon, no glassmorphism cards, no gradient blobs.

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#070b14` | Page background |
| `--bg-deep` | `#05080f` | Alternate section band (rhythm) |
| `--surface` / `--surface-2` | `#0d1524` / `#131d31` | Raised elements, hover |
| `--paper` / `--paper-2` | `#f2efe8` / `#e8e3d8` | Fiscal section, bar tracks on paper |
| `--text` / `--text-2` / `--text-3` | `#e9eef5` / `#a4b1c3` / `#7d8ca1` | Primary, secondary, captions (all ≥ 4.5:1 on `--bg`) |
| `--ink` / `--ink-2` | `#0b1220` / `#475467` | Text on paper |
| `--line` / `--line-strong` | slate 14% / 30% | Hairlines, grid |
| `--accent` | `#5ec4da` | Navigation, focus, "value" |
| `--scen-a` | `#7f98cf` | Scenario A (15 wells) |
| `--scen-b` | `#5ec4da` | Scenario B (30 wells) — same hue as value on purpose |
| `--gross-split` / `-ink` | `#d8b98a` / `#8a6532` | Gross Split (dark variant for text on paper) |
| `--cost-recovery` | `#8392a8` | PSC Cost Recovery |
| `--cost` | `#c98b66` | Cost, CAPEX/OPEX, hurdles |
| `--gov` | `#56657c` | Government share |
| oil gold | `#e0ae62` | Oil / revenue (3D particles, sensitivity) |

## Typography

| Role | Face | Token |
| --- | --- | --- |
| Display (storytelling lines, section titles, metrics) | Instrument Serif 400 + italic | `--text-display`, `--text-h2`, `--text-metric` |
| Heading (h3) | Instrument Serif | `--text-h3` |
| Body / UI | Geist | `--text-body`, `--text-lede` |
| Caption / labels / figures | Geist Mono | `--text-caption`, `.eyebrow` |

Why: a serif at display size reads like an investment memo — calm, credible,
editorial — and contrasts with the technical mono used for every figure and
source. Geist keeps UI text neutral and highly legible. All three are loaded
through `next/font` (self-hosted at build time).

Line length: prose capped at `--container-prose` (44rem); ledes ~60ch.

## Spacing, grid, containers

Tailwind 4px scale; sections use `py-24 md:py-36`, internal rhythm `mt-16/24`.
Container `--container-page` 78rem with fluid gutters `clamp(1.25rem, 4vw, 3rem)`.
Layouts use CSS grid with asymmetric columns (e.g. `[1fr_2fr]` reading rows,
`[1.4fr_7rem_7rem_1.6fr]` scoreboards) rather than equal card grids.

## Radius, shadow, blur

`--radius-sm/md/lg/xl/2xl` = 4/8/12/16/20px; used sparingly (the decision stage,
the role node). `--shadow-panel` only on the central role node. `--blur-glass`
14px only on the fixed header.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `ease.out` | cubic-bezier(0.22, 1, 0.36, 1) | Reveals, bars, 3D well drilling (via `bezier()`) |
| `ease.inOut` | cubic-bezier(0.65, 0, 0.35, 1) | Line drawing (connectors, J-curve) |
| `duration.fast/base/slow/cinematic` | 0.2 / 0.5 / 0.9 / 1.4 s | |

Rules: every motion explains a transformation (lines converge, bars grow from
a baseline, the J-curve draws in time order, wells are drilled in sequence).
Reveals run once. Scroll-linked motion only for the Field-to-value spine and the
header progress bar; no scroll hijacking. `MotionConfig reducedMotion="user"`
removes transform animation; the 3D scene stops its sway and particle flow and
shows all 30 wells immediately.

## Data visualisation

Custom SVG/HTML charts, each with a text alternative:
ratio ladder (log scale, B÷A), cost-behaviour matrix, split bars, J-curve,
scoreboard with DPI hurdle, tornado. Every chart has a source note; values read
from report figures carry an "Approx." badge.
