# Pet Tracker - Claude Code Guide

## Project Overview

Pet Tracker is a full-stack monorepo application for tracking symptoms and changes in pet health. Consists of a React Native (Expo) mobile app and a Node.js (Express) backend API. Built with TypeScript in strict mode. Mobile app runs on iOS, Android, and web.

## Tech Stack

### Mobile App (`apps/mobile/`)

- **Framework:** React Native with Expo SDK 54 (managed workflow)
- **Language:** TypeScript (strict mode)
- **Navigation:** Expo Router v6 (file-based routing)
- **Styling:** NativeWind v4 (Tailwind CSS)
- **Unit/Component Testing:** Jest 29 + React Testing Library
- **E2E Testing:** Detox 20 (gray-box, TypeScript)
- **Web:** Metro + react-native-web

### Backend API (`apps/api/`)

- **Framework:** Node.js + Express
- **Language:** TypeScript (strict mode)
- **ORM:** Prisma
- **Database:** PostgreSQL (via Supabase)

### Monorepo

- **Package Manager:** pnpm workspaces
- **Shared Types:** `packages/types/`
- **Linting:** ESLint 8 + Prettier
- **Git hooks:** husky + lint-staged

## Project Structure

```
pet-tracker/
├── apps/
│   ├── mobile/           # React Native + Expo app
│   │   ├── app/          # Expo Router pages (file-based routing)
│   │   │   ├── _layout.tsx   # Root layout
│   │   │   ├── index.tsx     # Home screen
│   │   │   └── tests/        # Unit tests for screens
│   │   ├── src/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── constants/    # App-wide constants and config
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── types/        # Mobile-specific types
│   │   │   └── utils/        # Utility functions
│   │   ├── e2e/          # Detox E2E tests (TypeScript)
│   │   ├── assets/       # Images, fonts, icons
│   │   └── package.json  # Mobile app dependencies
│   └── api/              # Node.js + Express backend
│       ├── src/
│       │   ├── lib/      # Shared utilities (Prisma client)
│       │   └── index.ts  # Express server entry point
│       ├── prisma/
│       │   └── schema.prisma  # Database schema
│       └── package.json  # API dependencies
├── packages/
│   └── types/            # Shared TypeScript types
│       ├── src/
│       │   └── index.ts  # Type exports
│       └── package.json
├── docs/ADRs/            # Architecture Decision Records
└── .prompts/             # Reusable prompt templates for Claude Code
```

## Common Commands

```bash
# Development - Workspace level (run from root)
pnpm dev                # Start both API and mobile app concurrently
pnpm dev:mobile         # Start mobile app only
pnpm dev:api            # Start API only

# Development - Mobile specific
pnpm --filter @pet-tracker/mobile start      # Start Expo dev server
pnpm --filter @pet-tracker/mobile ios        # Start on iOS simulator
pnpm --filter @pet-tracker/mobile android    # Start on Android emulator
pnpm --filter @pet-tracker/mobile web        # Start web version

# Development - API specific
pnpm --filter @pet-tracker/api dev           # Start API dev server
pnpm --filter @pet-tracker/api prisma:push   # Push schema to database
pnpm --filter @pet-tracker/api prisma:studio # Open Prisma Studio

# Code quality (all workspaces)
pnpm lint               # Run ESLint on all workspaces
pnpm format             # Format code with Prettier on all workspaces
pnpm typecheck          # Run TypeScript type checking on all workspaces
pnpm test               # Run tests on all workspaces

# Mobile specific testing
pnpm --filter @pet-tracker/mobile test              # Run unit/component tests
pnpm --filter @pet-tracker/mobile test:watch        # Run tests in watch mode
pnpm --filter @pet-tracker/mobile test:coverage     # Run tests with coverage
pnpm --filter @pet-tracker/mobile build:e2e:ios     # Build iOS app for E2E
pnpm --filter @pet-tracker/mobile test:e2e:ios      # Run E2E tests on iOS
```

## Styling

- **NativeWind v4** provides Tailwind CSS utility classes via `className` prop on all platforms
- Config lives in `apps/mobile/tailwind.config.js`; global styles in `apps/mobile/global.css`
- `global.css` is imported once in `apps/mobile/app/_layout.tsx` — do not import it elsewhere
- Use `className` for styling; avoid mixing `className` and `style` on the same element
- Run `pnpm --filter @pet-tracker/mobile start --clear` if styles don't appear after config changes (Metro cache)

## Conventions

- **Components:** One component per file, named exports for non-screen components
- **Screens:** Default exports in `apps/mobile/app/` directory (Expo Router convention)
- **Styles:** NativeWind `className` prop with Tailwind utilities
- **Types:** Cross-app types in `packages/types/`, app-specific types in respective `src/types/`
- **Path aliases (mobile):** `@/*` maps to `apps/mobile/src/*`
- **Workspaces:** Use `pnpm --filter <workspace-name>` for workspace-specific commands

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

- Test files live in `apps/mobile/e2e/` directory as `*.test.ts`
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
2. Generate native projects: `cd apps/mobile && npx expo prebuild`
3. Build for E2E: `pnpm --filter @pet-tracker/mobile build:e2e:ios` or `pnpm --filter @pet-tracker/mobile build:e2e:android`
4. Run tests: `pnpm --filter @pet-tracker/mobile test:e2e:ios` or `pnpm --filter @pet-tracker/mobile test:e2e:android`

Alternatively, use EAS Build profiles `detox-ios` / `detox-android` for cloud builds.

## Architecture Decisions

All major decisions are documented in [docs/ADRs/](docs/ADRs/):

- [005 - Styling NativeWind](docs/ADRs/005-styling-nativewind.md)
- [006 - Tech Stack](docs/ADRs/006-tech-stack.md)
- [007 - Monorepo Structure](docs/ADRs/007-monorepo-structure.md)
- [008 - Database Strategy](docs/ADRs/008-database-strategy.md)
- [009 - API Design](docs/ADRs/009-api-design.md)

## Debugging Approach

- **Try the simplest fix first** before deep-diving into version checks, exports, or bundle analysis
- For blank pages / missing styles on web: start with `pnpm start --clear` (Metro cache) or `npx expo install --fix` (version mismatches)
- Only escalate to investigating configs, bundle output, or serving builds if the quick fixes don't resolve it
- Avoid over-investigation — ask the user to verify after each simple fix before going deeper

## Git & PR Workflow

### Commit Strategy

- **One commit per PR comment** — When addressing code review feedback, group all file changes that address a single comment into one commit
  - Example: Comment about "ADR heading mismatches" affecting 4 files → 1 commit with all 4 files
  - Don't split into separate commits per file unless they address different comments
- **Concise commit messages** — One-line summaries only, no multi-paragraph explanations
  - Format: `<action> <what was fixed>`
  - Good: `Fix ADR heading numbers to match filenames`
  - Bad: `Fix ADR 006 heading\n\nThis addresses the PR comment about...` (too verbose)
- **Always include Co-Authored-By** tag for AI pair programming:
  ```
  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```

### PR Comments

- Fetch and address PR comments using `/pr-comments` command
- Create atomic commits that map 1:1 to review feedback
- This makes it easy to review what was addressed and track changes

## Agent Collaboration Files

| File                      | Purpose                                          | Git tracked?    |
| ------------------------- | ------------------------------------------------ | --------------- |
| `CLAUDE.md`               | Project overview and conventions for Claude Code | Yes             |
| `.claude/claude.local.md` | Session-specific context and notes               | No (gitignored) |
| `.prompts/`               | Reusable prompt templates                        | Yes             |
