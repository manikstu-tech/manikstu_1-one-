# Design — Manikstu Agro Operations Platform
**Status:** Visual direction documented; implementation pending | **Updated:** 2026-10-16

## Design goals
Modern, premium, professional operations software. Clear status scanning, restrained surfaces, readable tables, desktop management and responsive mobile field workflows. Use supplied Manikstu logo and do not apply AJAH-specific rules to all projects.

## Colours
| Token | Hex | Use |
|---|---|---|
| brand.green | `#4A8C3F` | Primary actions, selected nav, progress |
| brand.leafDark | `#3A7030` | Headings, strong brand surfaces |
| brand.red | `#D4342C` | Important alerts, defects, destructive actions |
| brand.cream | `#FDF6EC` | Warm surface / alternate rows |
| brand.charcoal | `#1A1A1A` | Primary text |
| brand.riceWhite | `#F5F0E8` | Secondary warm background |
| brand.bambooGold | `#C4952A` | Caution/pending states where suitable |
| semantic.successBg | `#EAF3E6` | Approved/success background |
| border.default | `#DDE4DA` | Borders |
| text.muted | `#667064` | Secondary text |

## Fonts and typography
Recommended UI font: Inter for headings, body, forms and tables; logo retains its own wordmark. Confirm font licensing/loading during implementation.
- Display: 32/40 px, rare.
- H1: 28/36 px.
- H2: 22/30 px.
- H3: 18/26 px.
- Body: 14/22 px.
- Small body: 13/20 px.
- Label: 12/16 px.
- Caption: 11/16 px.
Do not shrink table text excessively; use responsive columns or detail panels.

## Layout
4 px spacing scale (4, 8, 12, 16, 20, 24, 32, 40, 48); desktop sidebar around 240–264 px; card radius 10–14 px; subtle borders/shadows; clear heading/filter/action hierarchy.

## Components
Application shell; project switcher; breadcrumbs; page header; KPI card; text-labelled status chip; searchable table; filters; validated form controls; confirmation dialog; audit timeline; document/evidence panel; stage tracker; task/issue card; separate financial summary; mobile action sheet and upload controls.

## Navigation
Dashboard; Projects; Beneficiaries/Farmers; Sites/Assets/Sheds; Work Orders/Contractors; Materials/Inventory; Finance; Tasks/Issues/Approvals; Documents; Reports; Users & Roles; Settings. Show project-specific modules according to project type and permissions.

## Screen guidance
- Company dashboard: cross-project KPIs, overdue actions, stale updates, financial exceptions, last-updated time and filters.
- Project workspace: team, configured stages, status, dates, action queue, operations, finance, documents and reports.
- Beneficiary intake: source reference, identity/contact, location, approved amount and project-specific contribution policy; consent and verification are separate states.
- Site detail: stable ID, current stage, owner, next action, evidence, materials, financial snapshot, issues and history.
- Field forms: short mobile forms, upload state, clear save/retry feedback.
- Finance: distinct ledgers and reconciliation status.

## Accessibility
Aim for WCAG AA contrast, keyboard navigation, visible focus, persistent labels, clear validation and touch-friendly mobile controls. Never communicate state by colour alone.

## Handoff status
Current assets are design specification and generated concept board, not a native editable Figma file or coded interactive prototype. Figma handoff should include components/variants, responsive frames, prototypes and annotated edge states.
