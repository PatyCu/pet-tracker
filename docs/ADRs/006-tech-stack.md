# ADR 006 - Tech Stack

**Date:** 2026-02-18
**Status:** Accepted

## Context

Pet Tracker is a personal project to track a pet's health over time. The app needs to run on iOS, Android, and Web from a single codebase, support multiple pets per user, and persist data remotely so it's accessible across platforms. The project is built by a single developer with an existing Netlify account and familiarity with TypeScript and React.

## Decisions

### Frontend: React Native + Expo SDK 54

**Chosen:** React Native with Expo managed workflow.

**Rationale:**

- Single codebase for iOS, Android, and Web via `react-native-web`
- Expo managed workflow reduces native tooling overhead significantly
- Expo Router v6 provides file-based routing familiar to Next.js users
- Large ecosystem, strong TypeScript support

**Alternatives considered:**

- Flutter: strong cross-platform story but requires Dart, a separate language
- Next.js (web only): ruled out because mobile support was a hard requirement

---

### Styling: NativeWind v4

**Chosen:** NativeWind v4 (Tailwind CSS for React Native).

**Rationale:**

- Utility-first styling consistent across mobile and web
- Eliminates context-switching between CSS and StyleSheet APIs
- v4 is built on the new React Native architecture

**Constraints:**

- Run `pnpm start --clear` if styles don't appear after config changes (Metro cache)
- Never mix `className` and `style` props on the same element

---

### Backend: Node.js + Express

**Chosen:** Node.js with Express.

**Rationale:**

- Classical, well-understood REST server architecture
- More explicit and easier to reason about than serverless functions
- Full control over middleware, error handling, and request lifecycle
- Netlify Functions were considered but ruled out due to cold starts, bundling constraints, and added complexity for a relational data model

**Alternatives considered:**

- Netlify Functions: simpler deployment but less control, cold start issues, harder to debug locally
- Fastify: faster than Express but less familiar; not worth the learning overhead for this project

---

### ORM: Prisma

**Chosen:** Prisma.

**Rationale:**

- Fully type-safe database access — TypeScript types are generated from the schema
- Schema-first approach makes the data model explicit and version-controlled
- Built-in migration system (`prisma migrate`) for evolving the schema safely
- Excellent DX with Prisma Studio for inspecting data locally

**Alternatives considered:**

- Drizzle: more lightweight, but less mature ecosystem and tooling at time of decision
- Raw SQL / `pg`: too verbose, no type safety without significant boilerplate

---

### Database: PostgreSQL via Supabase

**Chosen:** Supabase (hosted PostgreSQL).

**Rationale:**

- Generous free tier suitable for a pet project
- Provides a clear migration path to add auth, file storage (for pet photos), and realtime in future iterations without changing the database
- Standard PostgreSQL — no vendor lock-in at the database level, Prisma connects via a standard connection string

**Alternatives considered:**

- Neon: also serverless Postgres, simpler but fewer future extension points
- PlanetScale: MySQL-based, not compatible with Prisma's full feature set at the time

---

### Validation: Zod

**Status:** Deferred to post-MVP (Should, not Must).

**Rationale for deferral:**

- No auth and a simple schema reduces the risk of bad data in early development
- Will be introduced when API endpoints are stabilised to validate incoming request bodies

---

### Package Manager: pnpm

**Chosen:** pnpm.

**Rationale:**

- Efficient disk usage via content-addressable storage
- First-class monorepo support via pnpm workspaces
- Strict dependency resolution prevents phantom dependencies

---

### Language: TypeScript (strict mode)

**Chosen:** TypeScript with `strict: true` across all packages.

**Rationale:**

- End-to-end type safety from API response to UI rendering
- Shared types package (`packages/types`) ensures frontend and backend never diverge
- Strict mode catches the most common type errors at compile time

## Consequences

- All new code must be TypeScript — no `.js` files
- No `any` types permitted without explicit justification
- Shared types must live in `packages/types`, never duplicated across apps
- Backend hosting is deferred — Express runs locally during development; hosting platform (Railway, Render, Fly.io) to be decided pre-GA
