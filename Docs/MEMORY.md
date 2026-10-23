# Project Memory — Manikstu Agro Operations Platform
**Updated:** 2026-10-19

## Product direction
Company-wide Operations Management Platform; Project AJAH is one configurable project. Core principle: permanent traceable site/shed record linked to beneficiary, approved work, construction, materials, finances, documents, issues and history.

## User-reported problem
Records spread across spreadsheets, WhatsApp, calls and paper. Progress, deadlines, delay reasons, material movement, completion, actual cost, pending actions, approvals, document organization and consolidated financial visibility lack consistent tracking.

## AJAH workflow facts
1. Government beneficiary list and approved work/budget.
2. Verify details and call for consent.
3. ₹1.25 lakh upfront beneficiary contribution; Finance verifies bank transaction.
4. Supervisor assesses site suitability.
5. AVP Infrastructure allocates fabricator based on speed/cost.
6. AVP creates work order; advance follows.
7. Model A: fabricator supplies prefabricated components/materials and builds. Model B: Manikstu supplies materials; supervisor signals arrival.
8. Progress updates currently through WhatsApp/calls and inconsistent.
9. Fabricator sends photos/videos; defects return for correction and resubmission.
10. Completion confirmation and final shed-wise costing lack a consistent process.
₹1.25 lakh rule is AJAH-specific unless separately confirmed.

## Discovery status
Answers recorded through Question 36. Question 37 is pending; do not invent the final number of questions.

## Documents created in this pack
- PRD.md — product scope, users, features, metrics and acceptance.
- ARCHITECTURE.md — proposed stack, app flow, entities, folders, API and security.
- RULES.md — engineering guardrails, error handling and AI boundaries.
- PHASES.md — roadmap and exit gates.
- DESIGN.md — palette, fonts, typography, components and screen guidance.
- MEMORY.md — this handoff.
- README.md — index/status.

## Current file being worked on
Frontend-only static replica in `apps/web` (Next.js 16.4.2 / React 19.3 / Tailwind 4 / lucide-react) — replicates the 21 approved screenshots verbatim, hardcoded per-screen mocks, light theme only, no backend.
- Done: login screen (`app/login/page.tsx`), workspace shell (sidebar + header, `app/(workspace)/layout.tsx`), company dashboard (`app/(workspace)/dashboard/page.tsx`) with map placeholder per locked decision.
- Next: Projects list → Project Workspace (AJAH), then Shed Register / Shed Detail.
**Next file:** `app/(workspace)/projects/page.tsx`.

## Replica decisions (confirmed by user)
Frontend-only static replica; hardcoded mocks kept verbatim including cross-screen number inconsistencies; no dark mode; map dropped for placeholder card; no auth/finance math/sync/WhatsApp; EN-only strings. Login has no language cards; top-right `English (EN)` pill stays.

## Proposed stack, not implemented
Next.js 16 / React 19 / TypeScript; Laravel 13 REST; PostgreSQL; private S3-compatible media storage; Laravel queue/scheduler.

## Brand
Green `#4A8C3F`; dark leaf `#3A7030`; deep `#0C3B20`; red `#D4342C`; cream `#FDF6EC`; charcoal `#1A1A1A`; rice white `#F5F0E8`; bamboo gold `#C4952A`. Use attached Manikstu logo. Tokens in `apps/web/app/globals.css`. Logo (JPEG, white bg) needs a white rounded chip on dark surfaces.

## Open decisions
Exact stages/transition authority; completion inspection/handover; accounting treatment; material accountability; deadlines/escalation; approval matrix; replacement linkage; fabricator scorecard; hosting/backup/retention; WhatsApp and offline needs.

## Session guardrails
Separate confirmed, user-reported, proposed and open. Do not invent metrics or claim app implementation/Figma prototype exists. Do not apply AJAH-specific rules company-wide. Update this file after meaningful work.
