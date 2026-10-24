# Engineering File and Folder Conventions

**Document owner:** Engineering  
**Status:** Approved for new code  
**Applies to:** Manikstu Agro Operations Platform  
**Last updated:** 2026-10-24

## 1. Purpose and scope

This standard defines how source code, routes, tests, assets, documentation,
and shared packages are named and organized. Its purpose is to make the
codebase predictable, discoverable, maintainable, and safe to extend.

The standard applies to all new work. Existing files do not need to be renamed
unless a focused migration is approved. Product behavior changes must not be
mixed with broad naming or directory migrations.

The terms **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are normative:

- **MUST / MUST NOT** — mandatory requirement.
- **SHOULD / SHOULD NOT** — default practice; deviations require a clear reason.
- **MAY** — permitted option.

## 2. Core principles

1. A file MUST have one clear responsibility.
2. Code MUST be placed with the smallest logical owner: route, feature,
   application, or shared package.
3. Names MUST describe the business or technical responsibility, not the
   implementation history.
4. New code MUST follow the naming rules in this document.
5. Existing conventions MUST be preserved when modifying nearby code unless the
   change is an intentional migration.
6. Generated output, credentials, local environment files, and personal editor
   state MUST NOT be committed.

## 3. Repository structure

```text
/
├── apps/
│   ├── web/                    # Next.js web application
│   └── api/                    # Planned Laravel API
├── packages/
│   ├── shared-types/           # Cross-application contracts
│   └── config/                 # Shared configuration
├── Docs/                       # Product and engineering documentation
├── UI & UX Design/             # Design references and handoff material
├── infra/                      # Deployment and backup configuration
└── .vscode/                    # Intentional workspace configuration
```

`apps/` is reserved for deployable applications. `packages/` is reserved for
code intentionally consumed by more than one application. A feature MUST NOT
receive a new top-level directory.

The existing `Docs/` and `UI & UX Design/` directories are approved repository
exceptions to the lowercase directory rule because they are established
documentation and design locations.

## 4. Directory naming

- New directories MUST use lowercase kebab-case.
- Route segments MUST use lowercase kebab-case, for example `work-orders`.
- Directories MUST NOT use spaces, camelCase, or arbitrary abbreviations.
- Domain directories SHOULD use the product language used in the PRD and
  architecture documentation.

```text
Correct:   work-orders, shared-types, project-settings
Incorrect:  workOrders, WorkOrders, work_orders, "Project Settings"
```

## 5. Next.js application structure

```text
apps/web/
├── app/                        # Routes and route-local UI
├── components/                 # Reusable UI across features
│   ├── ui/                     # Primitive presentational components
│   ├── forms/                  # Reusable form controls and sections
│   ├── tables/                 # Reusable tables and data grids
│   └── navigation/             # Navigation and application shell
├── features/                   # Domain-oriented feature modules
├── hooks/                      # Shared React hooks
├── lib/                        # Framework-independent utilities and clients
├── types/                      # Application-wide TypeScript types
├── tests/                      # Non-colocated tests and end-to-end tests
└── public/                     # Static files served from the site root
```

Directories SHOULD be created only when they contain code. Empty placeholder
directories MUST NOT be committed.

## 6. Next.js routes and special files

```text
app/
├── layout.tsx                  # Root or nested layout
├── page.tsx                    # Route entry point
├── loading.tsx                 # Loading UI
├── error.tsx                   # Error boundary
├── not-found.tsx               # Not-found UI
├── (auth)/                     # URL-free route group
│   └── login/page.tsx
└── (workspace)/                # URL-free route group
    ├── layout.tsx
    └── work-orders/page.tsx
```

- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`
  MUST retain these lowercase framework-defined names.
- Route groups MAY use parentheses when grouping routes without changing URLs.
- Dynamic segments MUST use the Next.js form, such as `[projectId]`.
- Route-local implementation files MAY use a leading underscore, such as
  `_components.tsx`.
- Shared components MUST live outside `app/`, under `components/`.
- Route components SHOULD remain small and delegate domain logic to feature
  modules or shared utilities.

## 7. TypeScript and React filenames

| Responsibility | Required pattern | Example |
|---|---|---|
| React component | PascalCase | `StatusBadge.tsx` |
| Component test | Component name plus `.test` | `StatusBadge.test.tsx` |
| Hook | `use` plus PascalCase | `useProjectAccess.ts` |
| Context/provider | PascalCase plus `Context` or `Provider` | `AuthProvider.tsx` |
| Utility | lowercase kebab-case | `format-currency.ts` |
| API/client module | domain plus `-api` | `projects-api.ts` |
| Type module | domain plus `-types` | `project-types.ts` |
| Constants module | domain plus `-constants` | `stage-constants.ts` |
| Validation module | domain plus `-schema` | `work-order-schema.ts` |
| Server actions | domain plus `-actions` | `work-order-actions.ts` |

Component filenames and exported component names MUST match. Reusable modules
SHOULD use named exports. Next.js framework entry files MUST use the export
shape required by Next.js.

```tsx
// components/ui/StatusBadge.tsx
export function StatusBadge() {
  return null;
}
```

Established product terms such as `API`, `UI`, `ID`, and `URL` MAY remain
uppercase. Other abbreviations SHOULD be avoided.

## 8. Feature module structure

When a domain contains multiple screens, components, or services, it SHOULD be
organized as a feature module:

```text
features/work-orders/
├── components/
│   ├── WorkOrderStatusBadge.tsx
│   └── WorkOrderTable.tsx
├── work-order-schema.ts
├── work-orders-api.ts
├── work-order-types.ts
└── index.ts
```

Feature modules MAY import shared code from `components`, `hooks`, `lib`, and
`types`. Shared modules MUST NOT import from a specific feature. This preserves
ownership boundaries and reduces circular dependencies.

## 9. Imports and module boundaries

- The `@/*` alias SHOULD be used when importing across major directories.
- Relative imports SHOULD be used for immediate siblings.
- Type-only imports SHOULD use `import type`.
- Imports SHOULD be ordered as external packages, aliases, relative modules,
  then styles and assets.
- New path aliases MUST NOT duplicate an existing alias.
- A lower-level shared module MUST NOT import from a higher-level route or
  feature module.

```tsx
import { useMemo } from "react";
import type { Project } from "@/types/project-types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency } from "./format-currency";
```

## 10. Styling and static assets

- Global styles MUST remain in `app/globals.css`.
- Tailwind utilities and existing design tokens SHOULD be preferred over
  one-off CSS.
- Repeated brand colors, spacing, typography, or status values MUST use design
  tokens rather than duplicated literals.
- Static assets MUST be stored under `public/`.
- New asset category directories MUST use lowercase names.
- New asset filenames MUST use lowercase kebab-case and describe their purpose.

```text
public/
├── auth/
├── brand/
├── icons/
└── illustrations/
```

Example: `public/auth/login-hero.png`.

## 11. Tests

Tests SHOULD be colocated with the unit or feature they verify. Cross-feature
and end-to-end tests MAY be placed under `tests/`.

```text
components/ui/StatusBadge.test.tsx
features/work-orders/work-orders-api.test.ts
tests/e2e/work-orders.spec.ts
```

- Unit and component tests MUST use `.test.ts` or `.test.tsx`.
- End-to-end tests MUST use `.spec.ts` or `.spec.tsx`.
- Test names MUST describe observable behavior.
- Test data MUST be synthetic; real beneficiary, financial, credential, or
  personal data MUST NOT be committed.

## 12. Documentation

Repository-level documents use uppercase names as an approved convention:

```text
ARCHITECTURE.md
CONVENTIONS.md
DESIGN.md
MEMORY.md
PHASES.md
PRD.md
README.md
RULES.md
```

Documentation MUST:

- cover one primary subject;
- use headings and examples consistently;
- use relative links when linking within the repository;
- distinguish implemented behavior from proposed architecture;
- update `MEMORY.md` after meaningful engineering work.

## 13. Environment and generated files

The following files and directories MUST remain uncommitted:

```text
.env
.env.*
.next/
out/
build/
coverage/
node_modules/
```

Lockfiles MUST be committed when dependencies change. Credentials, machine-
specific paths, generated build output, and personal editor state MUST NOT be
committed.

## 14. Adoption and review

For every new change, contributors MUST:

1. Check for an existing component, helper, type, or feature before creating a
   duplicate.
2. Place the new file under its smallest logical owner.
3. Apply the naming rules in this document.
4. Run the relevant lint, type-check, and test commands.
5. Update this document only when the standard itself changes.

Any intentional exception SHOULD be documented in the pull request. Broad
renames MUST be proposed as a separate migration, including import updates,
validation results, and a rollback strategy.
