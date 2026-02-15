# 03-OUT: Migrate E2E Testing from Maestro to Detox

**Date:** 2026-02-15
**Input:** [03-IN-migrate-maestro-to-detox.md](03-IN-migrate-maestro-to-detox.md)

## What Was Done

### Removed

- `e2e/home.yaml` — Maestro flow file
- `test:e2e` script referencing `maestro`

### Added

- **Detox 20** (`detox@^20.47.0`) as dev dependency
- `.detoxrc.js` — Detox configuration with iOS simulator and Android emulator configs
- `e2e/jest.config.js` — separate Jest config for Detox (isolated from unit tests)
- `e2e/home.test.ts` — example E2E test in TypeScript
- `eas.json` — EAS Build profiles including `detox-ios` and `detox-android`

### Modified

- `package.json` — replaced `test:e2e` with `build:e2e:ios`, `build:e2e:android`, `test:e2e:ios`, `test:e2e:android`
- `jest.config.js` — added `/e2e/` to `testPathIgnorePatterns` so unit tests don't pick up Detox files
- `CLAUDE.md` — updated tech stack, structure, commands, and added Detox conventions
- `docs/ADRs/004-e2e-testing.md` — rewritten with Detox rationale (supersedes Maestro)

### Key Decisions

| Decision        | Choice                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------- |
| E2E tool        | Detox — gray-box, industry standard, TypeScript-native                                    |
| Why not Maestro | Black-box only, YAML less expressive, no app synchronization                              |
| Why not Appium  | Overkill for single-framework (React Native only) project                                 |
| Build strategy  | EAS Build profiles for cloud builds; local `expo prebuild` + xcodebuild/gradlew for local |

## Verification

```bash
pnpm run lint       # ✅ 0 errors
pnpm run typecheck  # ✅ 0 errors
pnpm test           # ✅ 3/3 unit tests passing (e2e excluded)
pnpm start          # ✅ App runs on phone via Expo Go (unchanged)
```

## Manual Testing Steps

### 1. Verify existing app still works (no regressions)

```bash
# Start the dev server
pnpm start

# Scan QR code with your iPhone camera → opens in Expo Go
# You should see "Pet Tracker" and the subtitle on screen
```

### 2. Verify unit tests pass

```bash
pnpm test
# Expected: 3 passed, 0 failed
```

### 3. Verify Detox config is valid (without running E2E)

```bash
# Check that Detox recognizes the configuration
npx detox test --configuration ios.sim.debug --list-tests 2>&1
# This will fail with "app not found" (expected — no native build yet)
# but should NOT fail with "configuration not found"
```

### 4. Running Detox E2E tests (requires native build — optional)

Detox cannot run against Expo Go. To actually run E2E tests, you need a native build:

```bash
# Step 1: Install Xcode (if not already)
# Open App Store → Search "Xcode" → Install

# Step 2: Generate native iOS project
npx expo prebuild --platform ios

# Step 3: Build the app for simulator
pnpm run build:e2e:ios

# Step 4: Run E2E tests
pnpm run test:e2e:ios
```

**Alternative (cloud build via EAS):**

```bash
# Install EAS CLI if needed
pnpm add -g eas-cli

# Build in the cloud
eas build --profile detox-ios --platform ios

# Download the build artifact, then run:
pnpm run test:e2e:ios
```

> **Note:** Running Detox E2E is optional at this stage. The configuration and test files are set up and ready — you can run them once you have features worth E2E testing.

### 5. Verify web still works

```bash
pnpm run web
# Browser should open with the Pet Tracker home screen
```

## Files Changed

| File                           | Action                        |
| ------------------------------ | ----------------------------- |
| `e2e/home.yaml`                | Deleted (Maestro)             |
| `e2e/home.test.ts`             | Created (Detox test)          |
| `e2e/jest.config.js`           | Created (Detox Jest config)   |
| `.detoxrc.js`                  | Created (Detox configuration) |
| `eas.json`                     | Created (EAS Build profiles)  |
| `jest.config.js`               | Modified (exclude e2e/)       |
| `package.json`                 | Modified (scripts, detox dep) |
| `CLAUDE.md`                    | Modified (Detox docs)         |
| `docs/ADRs/004-e2e-testing.md` | Rewritten (Maestro → Detox)   |
