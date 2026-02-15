# ADR 004: E2E Testing Tool

**Status:** Superseded (Maestro → Detox)
**Date:** 2026-02-15
**Updated:** 2026-02-15

## Context

We need an E2E testing tool for testing complete user flows on real devices/simulators. Initially chose Maestro for simplicity, but migrated to Detox for gray-box testing and industry alignment.

## Decision

**Detox** (migrated from Maestro).

### Reasoning

- **Industry standard** — used by Microsoft, Wix, Bloomberg, and other major React Native teams. Strong portfolio/resume signal.
- **Gray-box testing** — Detox synchronizes with the app internally (waits for animations, network, timers) rather than relying on arbitrary sleeps. This produces faster, more reliable tests than Maestro's black-box approach.
- **Maturity** — 6+ years of active development with a large ecosystem of plugins, CI integrations, and community resources.
- **TypeScript-native** — test files are TypeScript with full type safety, matching our codebase conventions. More expressive than Maestro's YAML for complex flows.
- **Deterministic** — gray-box synchronization eliminates flaky tests caused by timing issues, a common problem with black-box E2E tools.

### Why Not Maestro (Previous Choice)

- Black-box only — relies on UI polling, leading to slower tests and potential flakiness
- YAML-based flows lack expressiveness for complex scenarios (conditionals, loops, data setup)
- No synchronization with app internals (animations, network requests)
- Less recognized in the React Native hiring ecosystem

### Why Not Appium

- Overkill for a single-framework project — Appium is designed for cross-framework testing (Flutter + RN, native + web)
- Heavier setup and slower execution
- Detox's gray-box approach is purpose-built for React Native

### Setup

- Config: `.detoxrc.js` at project root
- Tests: `e2e/` directory, TypeScript files with `*.test.ts` naming
- Separate Jest config: `e2e/jest.config.js` (isolated from unit test config)
- EAS Build profiles: `detox-ios` and `detox-android` in `eas.json`
- Requires native builds (Xcode for iOS, Android Studio for Android) — cannot use Expo Go

### Test Conventions

- Use `testID` props on interactive/assertable elements for reliable selectors
- Prefer `by.id()` over `by.text()` for stable selectors
- Use `by.text()` for content verification
- One test file per user flow or screen

## Consequences

- Detox requires native builds — `expo prebuild` needed before running E2E tests
- Longer setup time than Maestro, but more reliable tests long-term
- CI pipeline needs simulator/emulator support for E2E runs
- iOS E2E requires macOS with Xcode; Android E2E requires Android SDK
