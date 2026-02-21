# ADR 008 - Database Strategy

**Date:** 2026-02-18
**Status:** Accepted

## Context

Pet Tracker needs to persist relational data (multiple pets per user, multiple events per pet) in a way that is accessible across platforms (iOS, Android, Web). A local-only approach was considered and ruled out.

## Why Not Local-Only

Local persistence (AsyncStorage, SQLite, MMKV) was initially considered for MVP simplicity. It was ruled out for two reasons:

1. **Web + mobile fragmentation.** With local storage, the phone and browser maintain completely separate databases. Data added on the phone would not appear in the web version and vice versa — fundamentally breaking the cross-platform requirement.
2. **expo-sqlite does not support web.** Expo's SQLite library only works on native platforms, requiring a separate storage strategy for web that would add complexity without a clear benefit.

## Decision

Use a **remote PostgreSQL database hosted on Supabase**, accessed via **Prisma** from the Express backend. The mobile app never accesses the database directly — all data flows through the API.

## Data Model Summary

See `apps/api/prisma/schema.prisma` for the full schema.

| Model              | Purpose                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `User`             | Single hardcoded user — identity anchor for all data                 |
| `Pet`              | Pet profile (name, species, breed, dateOfBirth, photoUrl)            |
| `PetCondition`     | Chronic or acute conditions linked to a pet                          |
| `Symptom`          | Dated health event with severity and optional body area              |
| `DietChange`       | Records diet changes (brand, food type). Current diet = latest entry |
| `Medication`       | A defined medication with dosage and frequency                       |
| `MedicationIntake` | Each instance of a medication being administered                     |

### Key Design Decisions

**`Medication` and `MedicationIntake` are separate models.** A medication (e.g. "Prednisolone 5mg daily") is defined once. Each time it is given, a `MedicationIntake` row is created. This enables adherence tracking and clean timeline generation without duplicating the medication definition.

**`DietChange` records changes only, not daily logs.** The current diet is always the most recent `DietChange` entry. This avoids redundant daily entries when the diet is stable.

**`PetCondition` is its own table.** A pet can have multiple conditions, each with its own type (chronic vs acute) and notes.

**`bodyArea` on `Symptom` is free-text.** Body area terminology varies too much across species to enumerate usefully.

## Auth Strategy (MVP)

No authentication is implemented in MVP. A single user row is seeded into the database at setup time:

```typescript
// apps/api/prisma/seed.ts
await prisma.user.upsert({
  where: { id: "default-user" },
  update: {},
  create: {
    id: "default-user",
    name: "Paty",
  },
});
```

The hardcoded ID `"default-user"` is referenced as a constant throughout the API:

```typescript
// apps/api/src/constants/index.ts
export const DEFAULT_USER_ID = "default-user";
```

`upsert` is used instead of `create` so the seed can be safely re-run without duplicating the user.

## Migration Path to Real Auth

The schema is already structured to support auth with minimal changes. When auth is introduced (post-GA):

1. Add an auth provider (e.g. Supabase Auth or Clerk)
2. Replace `DEFAULT_USER_ID` with the authenticated user's ID from the session token
3. Supabase's existing auth infrastructure integrates naturally since the database is already hosted there

## Consequences

- The mobile app has no direct database access — all reads and writes go through the API
- `DATABASE_URL` must be set as an environment variable in `apps/api`
- Prisma migrations must be run (`prisma migrate deploy`) when the schema changes
- The seed script (`prisma db seed`) must be run once on initial setup
- Backend hosting is deferred to pre-GA — the API runs locally during MVP development
