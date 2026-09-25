# Content sources

Source of truth: the team's final Plan of Development report, "Simprug Field –
Integrated Field Development" (January 2024). The report itself is **not** in
this repository. All figures are held in `data/economic-case-study.ts` with a
`source` reference.

## Reported values (used as-is)

| Item | Value | Report reference |
| --- | --- | --- |
| Scenario A / B producers | 15 / 30 | Section 8, p. 67; Tables 4.3–4.4 |
| Well phasing | A: 10 wells 2022, 2 in 2023; B: +9 in 2023, +6 in 2024 | Sections 4.2.1–4.2.2 |
| Recovery factor | 12.875% / 21.57% | Table 4.5, p. 38 |
| Cumulative oil | 116.73 / 195.55 MMSTB | Table 4.5 |
| Peak oil rate | 25,717.55 / 51,572.77 bopd | Table 4.5 |
| OOIP (simulation) | 905.58 MMSTB | Executive summary, p. 7 |
| Facilities | 50,000 bbl/d separator, 6.8 km flowline, ESP lift | Executive summary |
| Horizon | 20 years, 2019–2039 | Section 4.1.2 |
| Discount rate | 10% | Section 8.3 |
| PSC Cost Recovery split (oil) | 15% contractor / 85% government after cost recovery | Section 8.1 A |
| Gross Split base split | 43% contractor / 57% government | Section 8.1 B |
| DPI hurdle | 1.6 | Section 8.3, p. 74 |
| Scenario A: DPI, POT, IRR, VC, NPV10 | 6.95, 3.29, 52%, 13,332.11, 12,111.14 | Table 8.3 |
| Scenario B: DPI, POT, IRR, VC, NPV10 | 9.20, 3.36, 57%, 23,175.92, 21,595.53 | Table 8.4 |
| Conclusions | Scenario B; Gross Split; revenue most sensitive | Section 9 |

## Derived values (computed from reported values)

| Item | How |
| --- | --- |
| B ÷ A multiples (wells, RF, oil, rate, NPV, VC, POT, DPI, IRR) | Ratio of the two reported values |
| CAPEX / OPEX growth A→B | Ratio of the two scenario totals per line in Table 8.2 (drilling 2.0×, flowline ≈3.3×, surface facility 10×, workover/ESP 2.0×, exploration/crew/field ops 1.0×) |
| Sensitivity swings | From the labelled points of the NPV spider plot: revenue 1,929.09 / 5,441.54 vs base 3,685.32 → −47.7% / +47.7%; cost lines → ±15.4% and ±2.3% |

## Read from report charts (marked "Approx." on the site)

| Item | Figure |
| --- | --- |
| Cumulative discounted contractor cashflow by year, Gross Split, A and B | Figs 8.3 and 8.5; end points agree with reported NPV |
| End-of-horizon contractor cashflow, Cost Recovery vs Gross Split | Figs 8.3 and 8.5 |

## Deliberately not shown

- Absolute CAPEX/OPEX amounts: the table mixes units (e.g. exploration listed as 2,000,000 MUSD next to per-well costs in the thousands).
- Deterministic OOIP (14.015 MMSTB) and probabilistic P10/P50/P90: inconsistent formatting with the simulation value.
- Spider-plot base value (3,685.32): it does not match the tabled NPV, so only relative swings are used.
- Which spider line is CAPEX and which is OPEX: the legend is cropped in the report.
- Team members' names, course name/code, and the fictional operator name.
