# ADR 003: Testing Framework

**Status:** Accepted
**Date:** 2026-02-15

## Context

We need a testing infrastructure for unit, component, and integration tests before building features.

## Decision

**Jest 29 + React Testing Library for React Native** (`@testing-library/react-native`).

### Reasoning

- **jest-expo** preset handles all React Native + Expo transform configuration
- **React Testing Library** encourages testing behavior over implementation details
- Built-in Jest matchers in `@testing-library/react-native` v13+ (no separate `jest-native` package needed)
- Jest 29 chosen for compatibility with `jest-expo` SDK 54 (Jest 30 has incompatibilities)
- Industry standard with excellent documentation and community support

### Test Conventions

- Test files live in `tests/` directories adjacent to source files
- Named `[filename].test.ts(x)`
- Follow testing pyramid: more unit tests, fewer integration, minimal E2E
- Test behavior and public APIs, not implementation details

### Coverage

- Threshold set at 70% (branches, functions, lines, statements)
- Coverage reports via `pnpm test:coverage`
- CI-friendly configuration via `pnpm test:ci`

## Consequences

- `react-test-renderer` must match the exact React version (19.1.0)
- Jest config is in JS (not TS) to avoid ts-node dependency
- Snapshot tests included but should be used sparingly
