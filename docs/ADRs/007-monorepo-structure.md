# ADR 007 - Monorepo Structure

**Date:** 2026-02-18
**Status:** Accepted

## Context

Pet Tracker has two runnable apps (a React Native mobile/web frontend and a Node.js/Express backend) that need to share TypeScript types. A decision was needed on how to organise the codebase.

## Decision

Use a **monorepo with pnpm workspaces**, structured around an `apps/` and `packages/` convention.

```
pet-tracker/
├── apps/
│   ├── mobile/     # React Native + Expo
│   └── api/        # Node.js + Express
├── packages/
│   └── types/      # Shared TypeScript types
├── package.json
└── pnpm-workspace.yaml
```

## Rationale

- **Shared types without duplication.** `packages/types` is the single source of truth for domain types (Pet, Symptom, Medication, etc.) consumed by both the mobile app and the API. Changes to the data model automatically surface as TypeScript errors in both places.
- **Single repo, single PR.** Frontend and backend changes that belong together ship together. No cross-repo coordination overhead.
- **pnpm workspaces** handles inter-package linking locally without publishing to npm. `pnpm --filter <app> <command>` runs scripts in a specific workspace.
- **Simpler for a solo developer.** Two repos would add overhead (two CI pipelines, two sets of configs, two clone operations) with no benefit at this scale.

## Alternatives Considered

- **Two separate repos:** Cleaner separation of concerns for larger teams, but unnecessary complexity for a solo project. Would require publishing `packages/types` to npm or using git submodules to share types.
- **Single flat repo (no workspaces):** All code in one flat structure. Simpler initially but doesn't scale — no clear boundary between frontend and backend, shared types become harder to manage.

## Consequences

- All `pnpm` commands at the root apply to all workspaces via `-r` (recursive) flag
- Workspace-specific commands use `pnpm --filter <workspace-name> <command>`
- Each app (`mobile`, `api`) has its own `package.json`, `tsconfig.json`, and tooling config
- `packages/types` must be kept free of runtime dependencies — types only
- `prisma/` lives inside `apps/api/` — the mobile app has no direct database access
