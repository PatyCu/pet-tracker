# Pet Tracker

App to track symptoms and changes in your pet's health.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+ (`npm install -g pnpm`)
- [Expo Go](https://expo.dev/go) app on your phone (for physical device testing)
- iOS Simulator (macOS) or Android Emulator (optional)
- PostgreSQL database (via Supabase free tier)

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up API environment
echo "DATABASE_URL=your_supabase_connection_string" > apps/api/.env

# Generate Prisma client
pnpm --filter @pet-tracker/api exec prisma generate

# Push database schema
pnpm --filter @pet-tracker/api prisma:push

# Start both API and mobile app
pnpm dev

# Or start individually
pnpm dev:mobile    # Mobile app only
pnpm dev:api       # API only
```

## Development

```bash
# Run mobile app on specific platform
pnpm --filter @pet-tracker/mobile ios        # iOS Simulator
pnpm --filter @pet-tracker/mobile android    # Android Emulator
pnpm --filter @pet-tracker/mobile web        # Web browser

# Lint code (all workspaces)
pnpm lint

# Format code (all workspaces)
pnpm format

# Type check (all workspaces)
pnpm typecheck

# Run tests (all workspaces)
pnpm test
```

## Project Structure

```
apps/
├── mobile/          → React Native + Expo app
│   ├── app/         → Expo Router pages (file-based routing)
│   ├── src/         → Mobile app source code
│   └── e2e/         → Detox E2E tests
└── api/             → Node.js + Express backend
    ├── src/         → API source code
    └── prisma/      → Database schema and migrations
packages/
└── types/           → Shared TypeScript types
docs/ADRs/           → Architecture Decision Records
```

## Tech Stack

### Mobile App

- React Native + Expo SDK 54
- TypeScript (strict mode)
- Expo Router v6 (file-based navigation)
- NativeWind v4 (Tailwind CSS)
- Jest + React Testing Library + Detox

### Backend

- Node.js + Express
- Prisma ORM
- PostgreSQL (via Supabase)

### Monorepo

- pnpm workspaces
- Shared types package

See [docs/ADRs/](docs/ADRs/) for detailed architecture decisions.
