# Pet Tracker - Claude Code Guide

## Project Overview

Pet Tracker is a React Native (Expo) mobile app for tracking symptoms and changes in pet health. Built with TypeScript in strict mode. Runs on iOS, Android, and web.

## Tech Stack

- **Framework:** React Native with Expo SDK 54 (managed workflow)
- **Language:** TypeScript (strict mode)
- **Navigation:** Expo Router v6 (file-based routing)
- **Package Manager:** pnpm
- **Linting:** ESLint 8 + Prettier
- **Unit/Component Testing:** Jest 29 + React Testing Library
- **E2E Testing:** Detox 20 (gray-box, TypeScript)
- **Web:** Metro + react-native-web
- **Git hooks:** husky + lint-staged

## Project Structure

```
pet-tracker/
├── app/                  # Expo Router pages (file-based routing)
│   ├── _layout.tsx       # Root layout
│   ├── index.tsx         # Home screen
│   └── tests/            # Unit tests for screens
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # App-wide constants and config
│   ├── hooks/            # Custom React hooks
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Utility functions
├── e2e/                  # Detox E2E tests (TypeScript)
│   ├── jest.config.js    # Separate Jest config for E2E
│   └── *.test.ts         # E2E test files
├── assets/               # Images, fonts, icons
├── docs/ADRs/            # Architecture Decision Records
└── .prompts/             # Reusable prompt templates for Claude Code
```

## Common Commands

```bash
# Development
pnpm start              # Start Expo dev server
pnpm run ios            # Start on iOS simulator
pnpm run android        # Start on Android emulator
pnpm run web            # Start web version

# Code quality
pnpm run lint           # Run ESLint
pnpm run lint:fix       # Run ESLint with auto-fix
pnpm run format         # Format code with Prettier
pnpm run format:check   # Check formatting
pnpm run typecheck      # Run TypeScript type checking

# Unit / Component testing
pnpm test               # Run all unit/component tests
pnpm test:watch         # Run tests in watch mode
pnpm test:coverage      # Run tests with coverage report
pnpm test:ci            # Run tests in CI mode

# E2E testing (Detox) — requires native builds
pnpm run build:e2e:ios      # Build iOS app for E2E
pnpm run build:e2e:android  # Build Android app for E2E
pnpm run test:e2e:ios       # Run E2E tests on iOS simulator
pnpm run test:e2e:android   # Run E2E tests on Android emulator
```

## Conventions

- **Components:** One component per file, named exports for non-screen components
- **Screens:** Default exports in `app/` directory (Expo Router convention)
- **Styles:** Co-located StyleSheet.create at bottom of component files
- **Types:** Shared types in `src/types/`, component-specific types co-located
- **Path aliases:** `@/*` maps to `src/*`

## Testing Conventions

### Unit / Component Tests (Jest + RTL)

- Test files live in `tests/` directories adjacent to source files
- Named `[filename].test.ts(x)`
- Follow the **testing pyramid**: more unit tests, fewer integration, minimal E2E
- Test **behavior and public APIs**, not implementation details
- Use React Testing Library queries (getByText, getByRole) over testID when possible

```tsx
import { render, screen } from "@testing-library/react-native";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders expected content", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected text")).toBeOnTheScreen();
  });
});
```

### E2E Tests (Detox)

- Test files live in `e2e/` directory as `*.test.ts`
- Use `testID` props on components for reliable selectors
- Prefer `by.id()` for interaction targets, `by.text()` for content assertions
- One test file per user flow or screen
- Detox requires native builds — cannot run against Expo Go

```ts
import { by, device, element, expect } from "detox";

describe("Home Screen", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it("should display the title", async () => {
    await expect(element(by.text("Pet Tracker"))).toBeVisible();
  });
});
```

### Detox Setup (First-Time)

1. Install Xcode (iOS) or Android Studio (Android)
2. Generate native projects: `npx expo prebuild`
3. Build for E2E: `pnpm run build:e2e:ios` or `pnpm run build:e2e:android`
4. Run tests: `pnpm run test:e2e:ios` or `pnpm run test:e2e:android`

Alternatively, use EAS Build profiles `detox-ios` / `detox-android` for cloud builds.

## Architecture Decisions

All major decisions are documented in [docs/ADRs/](docs/ADRs/):

- [001 - Tech Stack](docs/ADRs/001-tech-stack.md)
- [002 - Web Platform](docs/ADRs/002-web-platform.md)
- [003 - Testing Framework](docs/ADRs/003-testing-framework.md)
- [004 - E2E Testing](docs/ADRs/004-e2e-testing.md)

## Agent Collaboration Files

| File                      | Purpose                                          | Git tracked?    |
| ------------------------- | ------------------------------------------------ | --------------- |
| `CLAUDE.md`               | Project overview and conventions for Claude Code | Yes             |
| `.claude/claude.local.md` | Session-specific context and notes               | No (gitignored) |
| `.prompts/`               | Reusable prompt templates                        | Yes             |
