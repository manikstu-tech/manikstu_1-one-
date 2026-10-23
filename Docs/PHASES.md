# Phases — Implementation Roadmap
**Status:** Proposed | **Updated:** 2026-10-16

## Phase 0 — Discovery and rule sign-off
Confirm exact stages, evidence, stage authority, inspection/handover, finance treatment, material accountability, deadlines/escalation, approval matrix, reassignment/replacement, fabricator scorecard, hosting, retention, WhatsApp and offline requirements.
**Exit:** business owner, Operations, AVP Infrastructure and Finance approve relevant rules.

## Phase 1 — Foundation and access
Repositories, environments, CI, authentication, role/project access, users/roles/projects, design tokens, audit framework, error conventions and test strategy.
**Exit:** permission tests pass, including denial of unauthorized project access.

## Phase 2 — Workspace and registries
Company dashboard shell, project portfolio/configuration, beneficiary registry, approved-work intake, site/shed registry, document metadata, search/filter/pagination and audit history.
**Exit:** test records trace from project to beneficiary, approved work, site and documents.

## Phase 3 — Operations workflows
Site assessment, contractor/fabricator directory, allocation history, work orders/revisions, stage transitions, mobile supervisor forms, material movement, progress evidence, inspection, defects, corrective actions, tasks and escalations.
**Exit:** synthetic AJAH shed completes workflow including defect and reassignment scenario.

## Phase 4 — Finance and reconciliation
Receipt entry/verification, expenses/disbursements, advances/payment allocation, commitments, shed/work-order reconciliation, variance reports and reversals.
**Exit:** Finance signs off calculations; duplicate/unverified receipts are not treated as verified.

## Phase 5 — Reporting and notifications
Live dashboards, stale-update/overdue detection, reminders, fabricator metrics, data-completeness reports and permission-checked exports.
**Exit:** report totals reconcile to source records; notification deduplication tested.

## Phase 6 — Pilot and rollout
Pilot users/projects, data migration, training, access review, backup restore test, security checks, issue triage and support plan.
**Exit:** end-to-end workflow passes, finance approves reconciliation, private document access is verified, backup restore succeeds.

## Deferred options
WhatsApp, offline sync, GPS/geotagging, external integrations, native mobile apps and AI assistance. Validate value, privacy, consent and ownership before scheduling.

## Task tracking fields
ID; phase; owner; status; dependency; acceptance criteria; test evidence; decision needed; last-updated timestamp.
