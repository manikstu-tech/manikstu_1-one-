# Project Memory — Manikstu Agro Operations Platform
**Updated:** 2026-10-24

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

## Completed UI/UX Audit & Production Enhancements (2026-10-24)
- **Flaw Detection & Audit:** Completed comprehensive audit across all 28 routes and components; resolved 18 prioritized issues in `flaw-register.md`.
- **Navigation & Routing:** Converted all anchor tags to client-side Next.js `<Link>` components, eliminating full-page browser reloads. Ancestor breadcrumbs are fully interactive.
- **Header Tools:** Added interactive `ProjectSwitcher` for multi-project switching (AJAH, SUSU, FPC, LPS, MANP), global accessible `CommandPalette` (`Ctrl+K`), and `LanguageModal` (EN, HI, OD, CG).
- **Core Action Flows:** Implemented modal creation and review dialogs for "New Shed", "New Beneficiary", "Create Work Order", "New Dispatch", "Create Task", "Upload Document", "Add User", "AVP Inspection Review", "Finance UTR Verification", and "Raise Support Ticket".
- **Data Filtering & Pagination:** All data tables feature live real-time search, multi-select dropdown filters, interactive pagination, and empty states.
- **Feedback & Notifications:** Integrated global `ToastProvider` and `useToast()` hook with auto-dismiss and ARIA live regions.
- **Quality & Verification:**
  - `npm --prefix apps/web run lint` → **0 errors, 0 warnings**.
  - `npm --prefix apps/web run build` → **28/28 Static/Partial Prerender routes generated successfully**.

## Brand Tokens
Green `#4A8C3F`; dark leaf `#3A7030`; deep `#0C3B20`; red `#D4342C`; cream `#FDF6EC`; charcoal `#1A1A1A`; rice white `#F5F0E8`; bamboo gold `#C4952A`. Tokens in `apps/web/app/globals.css`. Logo on dark surfaces uses a white rounded chip with padding.
