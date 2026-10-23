# PRD — Manikstu Agro Operations Management Platform
**Status:** Draft for validation | **Updated:** 2026-10-16

## What to build
A secure, company-wide operations platform. Project AJAH is one configurable project, not the entire product. Create traceable records for projects, beneficiaries/farmers, approved work, sites/assets/sheds, work orders, materials, transactions, documents, tasks, issues and approvals. Show status, owner, next action, evidence, deadlines and financial position without reconstructing data from Excel, WhatsApp, calls and paper.

## Problem statement
User-reported issues: fragmented records; inconsistent progress updates; no consistent deadline and delay-reason tracking; no consistent site-wise material record; completion confirmation and shed-wise costing are inconsistent; payment details are maintained by AVP/Operations while Finance verifies bank transactions; pending actions, decisions, approvals and documents lack consistent traceability; management lacks a reliable consolidated operational and financial view.

## Target users
- Management: company/project overview, exceptions, approvals, reports.
- Operations/project managers: daily execution, assignments and follow-up.
- AVP Infrastructure: fabricator allocation, work orders and approvals.
- Site supervisors: site assessment, material receipt, progress, inspections and evidence.
- Finance: receipt verification, expenses, payments, advances and reconciliation.
- Procurement/inventory: stock, dispatch, receipt, returns and usage.
- Fabricators: assigned work, progress, evidence and defect responses.
- Admin: users, roles, settings and audit access.

## Features
### P0 — Foundation
Authentication; role/project access; company dashboard; project portfolio; configurable project stages; beneficiary/farmer and approved-work registry; site/shed register; tasks/issues/due dates; document/media metadata; audit history; search/filter/pagination; basic exports and reminders.
### P1 — Operations
Site assessments; contractor/fabricator directory and assignment history; work orders/revisions; stage transitions; mobile field forms; material dispatch/receipt/shortage/return/usage; progress evidence; inspections/defects/corrective actions; receipt verification; expense/disbursement/commitment ledgers; reconciliation and variance reporting.
### P2 — Later, after validation
WhatsApp integration; offline capture; GPS/geotagging; bank/external-system integrations; native mobile apps; advanced analytics.
## AJAH workflow facts
1. Government list and approved work/budget intake. 2. Verify details and record consent. 3. Beneficiary deposits ₹1.25 lakh upfront; Finance verifies bank transaction. 4. Supervisor assesses site suitability. 5. AVP Infrastructure allocates fabricator based on speed and associated costs. 6. AVP creates work order; advance follows. 7. Model A: fabricator supplies prefabricated components/materials and builds. Model B: Manikstu supplies materials; supervisor informs fabricator when materials arrive. 8. Progress updates through WhatsApp/calls are inconsistent. 9. Fabricator sends photos/videos; defects are corrected and evidence resubmitted. 10. Completion confirmation and final shed-wise costing lack a consistent process.
**Important:** ₹1.25 lakh is AJAH-specific unless confirmed for another project.
## Success metrics
Establish pilot baselines for update freshness, on-time milestones, overdue-action age, material traceability, completion evidence, reconciled-cost coverage, verified transaction coverage, issue closure time and adoption.
## Out of scope initially
Full ERP replacement; automatic government disbursement; unapproved bank/WhatsApp integrations; AI approval of payments, beneficiaries, inspections or work orders.
## Acceptance criteria
Traceable records; enforced server-side permissions; separate financial categories; overdue actions show owner/due date/age; evidence has uploader/time/link/review state; reassignment preserves history; end-to-end tests pass; backup restore and document access are tested.
## Open decisions
Exact stages and transition authority; inspection/handover authority; accounting treatment of advances/materials/retention; material accountability; deadlines/escalation; approval matrix; replacement history; fabricator scorecard; hosting, backup, retention, WhatsApp and offline requirements.
