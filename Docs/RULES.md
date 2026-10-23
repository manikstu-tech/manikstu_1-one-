# Rules — Engineering, Product and AI Boundaries
**Status:** Draft | **Updated:** 2026-10-16

## What to use
- Treat the product as company-wide; AJAH is one configurable project.
- Separate confirmed facts, user-reported problems, proposals and open questions.
- Use stable IDs, server-side validation/authorization, database constraints and transactions.
- Preserve stage, assignment, approval and financial history.
- Use decimal money types, accessible reusable components, pagination and tested domain rules.
- Every open action should have an owner and due date or be visibly unassigned.
- Test permissions, financial calculations, state transitions and failure cases.

## Error handling
- Return actionable field-level validation and stable machine-readable error codes.
- Log technical context without secrets or unnecessary personal data.
- Never silently discard unsaved input.
- Use request/correlation IDs. Retry only safe operations; use idempotency for financial actions.
- Track failed jobs and provide a controlled retry/review process.

## AI development boundaries
- Read PRD, architecture, rules, phases, design and memory before making changes.
- Make the smallest coherent change.
- Do not invent rules, APIs, credentials, file paths, figures or test results.
- Ask for decisions when ambiguity affects correctness.
- Do not claim tests passed unless actually run.
- Update MEMORY.md after meaningful work.
- Use synthetic data for tests/screenshots.
- AI may draft/summarize/search only within approved privacy boundaries; it must not autonomously approve payments, replace beneficiaries, authorize work orders or accept completion.

## What to avoid
- Unnecessary libraries; unreviewed licenses/security; duplicated frontend/backend business logic.
- UI-only authorization; giant components/services; premature microservices.
- Floating-point money; hard deletion of financial records; treating sanctioned budget as received cash.
- Merging receipts, expenses, payments, commitments and accounting actuals.
- Marking receipts verified without approved Finance procedure.
- Showing mock data as real; using colour alone for status; hiding stale data.
- Sending personal/beneficiary data to external AI without approval.
- Fake audit events, approvals, metrics or test results.

## Definition of done
Acceptance criteria met; relevant tests run and results documented; authorization/validation checked; loading/empty/error/success states handled; responsive and accessibility checks completed; docs updated; MEMORY.md updated.
