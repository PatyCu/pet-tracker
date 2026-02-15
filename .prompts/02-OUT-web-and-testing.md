# 02-OUT: Web Platform Support and Testing Infrastructure

**Date:** 2026-02-15
**Input:** [02-IN-web-and-testing.md](02-IN-web-and-testing.md)

## What Was Done

### Web Platform Support

- Added `react-native-web`, `react-dom`, `@expo/metro-runtime`
- Web runs via Metro (not Vite) — same bundler for all platforms
- `pnpm run web` starts the app in a browser
- Documented Vite infeasibility in ADR 002

### Testing Infrastructure (Unit/Component)

- **Jest 29** with `jest-expo` preset (Jest 30 incompatible with jest-expo SDK 54)
- **React Testing Library** (`@testing-library/react-native` v13) with built-in matchers
- `react-test-renderer` pinned to 19.1.0 to match React version
- Config in `jest.config.js` (JS, not TS — avoids ts-node dependency)
- Setup file `jest.setup.ts` loads RNTL matchers via `@testing-library/react-native/matchers`

### Example Tests

- 3 passing tests in `app/tests/index.test.tsx`:
  - Renders app title
  - Renders subtitle
  - Snapshot match

### E2E Testing

- **Maestro** chosen over Detox (simpler, works with Expo Go, YAML-based)
- Sample flow in `e2e/home.yaml`
- `pnpm test:e2e` script (requires Maestro CLI on host)

### Pre-commit Hooks

- **husky** v9 initialized with `.husky/pre-commit`
- **lint-staged** runs ESLint + Prettier on staged `.ts/.tsx` files, Prettier on `.json/.md`
- `prepare` script ensures hooks install on `pnpm install`

### Test Scripts Added

| Script               | Purpose                         |
| -------------------- | ------------------------------- |
| `pnpm test`          | Run all tests                   |
| `pnpm test:watch`    | Watch mode                      |
| `pnpm test:coverage` | Coverage report (70% threshold) |
| `pnpm test:ci`       | CI-friendly mode                |
| `pnpm test:e2e`      | Run Maestro E2E flows           |

### ADRs Written

- [002 - Web Platform](../docs/ADRs/002-web-platform.md) — Metro over Vite
- [003 - Testing Framework](../docs/ADRs/003-testing-framework.md) — Jest 29 + RTL
- [004 - E2E Testing](../docs/ADRs/004-e2e-testing.md) — Maestro over Detox

### Updated Documentation

- `CLAUDE.md` updated with testing conventions, commands, and philosophy

## Verification

- `pnpm run lint` — 0 errors
- `pnpm run typecheck` — 0 errors
- `pnpm test` — 3/3 tests passing
- Pre-commit hooks verified working via `lint-staged`

## Notable Decisions

| Issue               | Resolution                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| Vite for web        | Not used — Metro handles all platforms; Vite lacks RN support              |
| Jest 30 vs 29       | Jest 29 — jest-expo SDK 54 incompatible with Jest 30                       |
| jest-native package | Not needed — matchers built into @testing-library/react-native v13+        |
| Jest config format  | JS not TS — avoids ts-node dependency with Jest 29                         |
| E2E tool            | Maestro — simpler than Detox, works with Expo Go                           |
| Test file location  | `tests/` directories adjacent to source (user preference over `__tests__`) |
