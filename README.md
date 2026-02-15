# Pet Tracker

App to track symptoms and changes in your pet's health.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+ (`npm install -g pnpm`)
- [Expo Go](https://expo.dev/go) app on your phone (for physical device testing)
- iOS Simulator (macOS) or Android Emulator (optional)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm start

# Run on specific platform
pnpm run ios        # iOS Simulator
pnpm run android    # Android Emulator
pnpm run web        # Web browser
```

## Development

```bash
# Lint code
pnpm run lint
pnpm run lint:fix

# Format code
pnpm run format
pnpm run format:check

# Type check
pnpm run typecheck
```

## Project Structure

```
app/              → Expo Router pages (file-based routing)
src/components/   → Reusable UI components
src/constants/    → App constants and configuration
src/hooks/        → Custom React hooks
src/types/        → Shared TypeScript types
src/utils/        → Utility functions
docs/ADRs/        → Architecture Decision Records
```

## Tech Stack

- React Native + Expo SDK 54
- TypeScript (strict mode)
- Expo Router (file-based navigation)
- ESLint + Prettier

See [docs/ADRs/001-tech-stack.md](docs/ADRs/001-tech-stack.md) for detailed rationale.
