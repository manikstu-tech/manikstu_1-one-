# Manikstu Agro Operations Platform — UI/UX Decision Update
**Version:** 1.1 | **Date:** 2026-10-16 | **Status:** Draft for approval

## Confirmed decisions
1. **Completion inspection:** AVP Infrastructure reviews completion evidence and records accept / correction required / reject, reviewer, timestamp, reason, and history. Fabricators cannot self-approve.
2. **Languages:** English, Hindi and Odia. Translate navigation, fields, validation, errors, empty/loading states, status chips and WhatsApp templates. Test text expansion and script readability at 360px.
3. **Offline:** Full offline capture and later sync is required. Design local drafts, queued submissions, syncing, synced, retry required and conflict-needs-review states. Show last successful sync and pending count. Never claim server save before server acknowledgement. Sensitive approvals and financial verification remain online-only unless an explicit secure exception is approved.
4. **Notifications:** WhatsApp is the selected notification channel. Use approved templates, recipient eligibility/consent, delivery logs and bounded retry/deduplication. Avoid sensitive financial details by default. In-app action queue remains available.
5. **Financial sign-off:** Finance lead plus Management sign-off for designated financial decisions. Exact decisions, approval order, thresholds and delegation remain open.
6. **Theme:** Light and dark themes. Use semantic tokens rather than colour inversion; verify contrast for all component states and persist theme preference after deciding whether preference is per user/device or follows system settings.

## Product scope and principles
Company-wide responsive web app, no native app. Project AJAH is Project #1; future goat-shed projects share the lifecycle and use project-specific configuration. Do not hardcode AJAH or its ₹1.25 lakh contribution as global defaults.

Permanent Shed ID links beneficiary, approved work, site, work order, fabricator, stages, materials, evidence, finances, issues and audit history. Delay is a flag/condition, not a replacement lifecycle stage. Separate approved budget, verified receipts, expenses/disbursements, commitments and reconciliation. Unverified receipts never count as verified receipts; sanctioned budget never means cash received.

## Updated workflow
Government list/approved work → verification → consent → project-specific contribution (Finance verifies bank receipt) → site assessment → site review → ready allocation → work order pending → awaiting materials/start → in progress → completion evidence → **AVP Infrastructure inspection** → correction/reinspection if needed → financial reconciliation → Finance + Management sign-off for designated decisions → closure. Reassignment preserves the previous assignment and history.

## Offline UX requirements
- Per-record status: Local draft, Queued, Syncing, Synced, Retry required, Conflict needs review.
- Keep draft inputs after connectivity/API failure.
- Use unique operation IDs/idempotency keys to prevent duplicate submissions.
- Never silently overwrite a server change; show conflicting fields and require a resolution path.
- Define which forms can be captured offline, whether media is queued, local storage protection, logout/shared-device behaviour, retention and session-expiry handling.
- Financial verification and approvals require online server confirmation by default.

## WhatsApp requirements
- Provider/business account and template ownership must be approved.
- Record message purpose/template, recipient eligibility/consent, related project/Shed ID, send/delivery/failure status when supported, timestamps and provider reference.
- Define trigger events, language selection, opt-out, rate limits, retry rules and fallback.
- Avoid sending sensitive beneficiary/financial details by default.

## Theme and localization
- English/Hindi/Odia language selector; locale-aware date/number formatting; translation keys rather than concatenated strings.
- Test all forms, validation, tables, status labels, empty/error/loading states and notification templates in all three languages.
- Light/dark semantic tokens; brand colours must be tested for contrast, not blindly inverted.
- WCAG AA contrast, visible keyboard focus, persistent labels, touch targets ≥44px where practical.

## Recommended implementation phases
0. Business rules/security sign-off.
1. App foundation, access, design tokens, localization and themes.
2. Project/beneficiary/approved-work registry and permanent Shed ID.
3. Site, work-order, material, progress, defect and AVP inspection workflows.
4. Finance ledgers and Finance + Management approval flow.
5. Offline outbox/sync, conflict handling and media recovery.
6. WhatsApp templates/delivery tracking and reports.
7. Field pilot, translation review, accessibility, backup/restore and rollout.

## Open decisions — must resolve before implementation
### Inspection and lifecycle
- Exact AVP completion checklist and required evidence.
- AVP delegation/absence process.
- Defect severity, correction deadlines, reinspection and escalation.
- Whether closure can proceed under an authorised exception.

### Offline and security
- Which forms/fields can be created offline?
- Confirm sensitive approvals and finance verification are online-only.
- Device storage protection, logout/shared-device/lost-device handling and retention.
- Media size/count limits and whether photo/video uploads queue offline.
- Conflict-resolution policy and maximum acceptable sync delay.
- Supported browsers/devices and storage quota strategy.

### WhatsApp
- Provider/account owner.
- Approved templates and event triggers.
- Consent/opt-out policy and source of preferred language.
- Retry limits, deduplication, rate limits and failure fallback.
- Who approves template changes and which delivery states are available.

### Finance
- Which decisions require Finance + Management sign-off?
- Sequential or parallel approvals; order, amount thresholds, delegation and escalation.
- Receipt entry vs verification roles.
- Accounting treatment of advances, retention, materials and expense recognition.
- Approved definitions for actual cost, variance, projected cost and cash position.

### Localization and themes
- Translation owner and approved glossary for English/Hindi/Odia.
- Default language: user preference or browser/system language?
- Default theme: light or follow system? Persist per user or device?
- Final dark-surface tokens and device/browser accessibility test matrix.

### Access and operations
- Final role × project permission matrix for view/create/edit/verify/approve/export.
- Whether Management has all-project access by default.
- Who grants project membership and audits access.
- Hosting, backup/recovery objectives, retention and migration/import rules.

## Current status
These are design/specification requirements, not proof of implementation. No app or editable Figma file is created by this update. Next step: resolve critical open decisions, then create Figma frames and connected prototypes, beginning with Shed Detail and offline field forms.
