# Pet Tracker — Iteration Plan

Each iteration delivers a working, end-to-end slice of functionality (frontend + backend together). Later iterations build on top of earlier ones. Nothing is built before it is needed.

---

## Iteration 0 — Project Foundation

**Goal:** A running monorepo with both apps booting and talking to each other. No features yet, just infrastructure that everything else builds on.

### Deliverables

- Monorepo scaffolded with pnpm workspaces (`apps/mobile`, `apps/api`, `packages/types`)
- `apps/mobile`: Expo app boots on iOS, Android, and Web with a placeholder home screen
- `apps/api`: Express server boots with a `GET /health` endpoint returning `{ status: "ok" }`
- Supabase project created, `DATABASE_URL` wired into `apps/api` via `.env`
- Prisma connected to Supabase — `prisma db push` succeeds
- ESLint, Prettier, husky, lint-staged configured across all workspaces
- TypeScript strict mode enabled in all packages
- `pnpm dev` starts both apps concurrently

### Success Criteria

- `GET http://localhost:3000/health` returns 200
- Expo app opens on web and iOS simulator
- `pnpm lint` and `pnpm typecheck` pass with no errors

---

## Iteration 1 — Pet Profiles

**Goal:** A user can create, view, edit, and delete pets. The first real data flows from the app through the API into the database.

### Deliverables

**Backend**

- Prisma schema: `User`, `Pet` models
- Seed script for the hardcoded `default-user`
- `GET /api/v1/pets`
- `POST /api/v1/pets`
- `GET /api/v1/pets/:id`
- `PUT /api/v1/pets/:id`
- `DELETE /api/v1/pets/:id`

**Shared**

- `Pet` type added to `packages/types`

**Frontend**

- Pet list screen (home screen) — shows all pets, empty state when none
- Add pet screen — form with name, species, breed, date of birth
- Pet detail screen — displays pet profile
- Edit pet screen
- Delete pet with confirmation
- Navigate between pets

### Success Criteria

- Can add a pet on the app and see it persist after a full app restart
- Can edit and delete a pet
- Empty state shown when no pets exist

---

## Iteration 2 — Conditions

**Goal:** A user can document a pet's known conditions (chronic or acute) as part of their profile.

### Deliverables

**Backend**

- Prisma schema: `PetCondition` model
- `POST /api/v1/pets/:id/conditions`
- `PUT /api/v1/pets/:id/conditions/:conditionId`
- `DELETE /api/v1/pets/:id/conditions/:conditionId`

**Shared**

- `PetCondition` type added to `packages/types`

**Frontend**

- Conditions section added to pet detail screen
- Add / edit / delete condition inline (no separate screen needed)
- Badge distinguishing chronic vs acute

### Success Criteria

- Can add multiple conditions to a pet
- Conditions are visible on the pet profile
- Can edit and remove a condition

---

## Iteration 3 — Symptom Logging

**Goal:** A user can log health symptoms for a pet, with a date, severity, body area, and notes. This is the core health tracking loop.

### Deliverables

**Backend**

- Prisma schema: `Symptom` model
- `GET /api/v1/pets/:id/symptoms`
- `POST /api/v1/pets/:id/symptoms`
- `PUT /api/v1/pets/:id/symptoms/:symptomId`
- `DELETE /api/v1/pets/:id/symptoms/:symptomId`

**Shared**

- `Symptom` type added to `packages/types`

**Frontend**

- Symptoms tab or section on the pet detail screen
- Symptom list — sorted by date descending, shows severity badge and body area
- Add symptom screen — date picker, severity selector, body area input, notes
- Edit and delete symptom

### Success Criteria

- Can log a symptom for a specific pet with a date and severity
- Symptoms appear in chronological order
- Can edit and delete a symptom

---

## Iteration 4 — Diet Tracking

**Goal:** A user can record when their pet's diet changed, capturing the food brand and type. Current diet = most recent entry.

### Deliverables

**Backend**

- Prisma schema: `DietChange` model
- `GET /api/v1/pets/:id/diet-changes`
- `POST /api/v1/pets/:id/diet-changes`
- `PUT /api/v1/pets/:id/diet-changes/:changeId`
- `DELETE /api/v1/pets/:id/diet-changes/:changeId`

**Shared**

- `DietChange` type added to `packages/types`

**Frontend**

- Diet section on the pet detail screen
- Shows current diet (most recent entry) prominently
- Full change history below it
- Add diet change screen — date, food type (dry/wet/raw/mixed), brand, notes
- Edit and delete diet change

### Success Criteria

- Can log a diet change and see it reflected as the current diet
- Full history of diet changes is visible
- Most recent entry is always displayed as current diet

---

## Iteration 5 — Medication Tracking

**Goal:** A user can define medications for a pet and log each time a dose is given.

### Deliverables

**Backend**

- Prisma schema: `Medication`, `MedicationIntake` models
- `GET /api/v1/pets/:id/medications`
- `POST /api/v1/pets/:id/medications`
- `PUT /api/v1/pets/:id/medications/:medicationId`
- `DELETE /api/v1/pets/:id/medications/:medicationId`
- `GET /api/v1/pets/:id/medications/:medicationId/intakes`
- `POST /api/v1/pets/:id/medications/:medicationId/intakes`
- `DELETE /api/v1/pets/:id/medications/:medicationId/intakes/:intakeId`

**Shared**

- `Medication`, `MedicationIntake` types added to `packages/types`

**Frontend**

- Medications section on pet detail screen
- Active vs past medications (active = no `endDate`, or `endDate` in the future)
- Add medication screen — name, dosage amount + unit, frequency, start date, end date (optional)
- Log intake button — quick action to record a dose as given today
- Intake history per medication
- Edit and delete medication

### Success Criteria

- Can add a medication and log individual doses
- Active medications are visually distinct from past ones
- Intake history is visible per medication

---

## Iteration 6 — Timeline View

**Goal:** A user can see all events for a pet in a single chronological list. This is the first unified view across all event types — and the foundation for the vet report.

### Deliverables

**Backend**

- `GET /api/v1/pets/:id/timeline` — returns all events (symptoms, diet changes, medication intakes) sorted by date, with a `type` field on each entry

**Frontend**

- Timeline screen accessible from the pet detail screen
- Unified list of all events sorted by date descending
- Visual distinction per event type (icon or color)
- Filterable by date range
- Filterable by event type

### Success Criteria

- All event types appear in a single sorted list
- Events from all categories are correctly interleaved by date
- Filtering by type and date range works

---

## Iteration 7 — Calendar View

**Goal:** A user can visualise events on a calendar, tapping a day to see what happened.

### Deliverables

**Backend**

- `GET /api/v1/pets/:id/calendar?month=YYYY-MM` — returns events grouped by day for the given month

**Frontend**

- Calendar screen with month view
- Days with events are visually marked (dot or color indicator per event type)
- Tap a day to see a list of events for that date
- Navigate between months

### Success Criteria

- Calendar shows correct indicators for days with events
- Tapping a day shows the correct events
- Month navigation works

---

## Iteration 8 — Timeline Export (Should / Could)

**Goal:** A user can generate and share a timeline report suitable for a vet visit.

### Deliverables

**Backend**

- `GET /api/v1/pets/:id/timeline/export` — structured timeline payload optimised for document generation

**Frontend**

- Export button on the timeline screen
- Generates a formatted summary (PDF or shareable text)
- Share via native share sheet (email, AirDrop, etc.)

### Success Criteria

- Can generate a readable timeline for a pet
- Can share it via the native share sheet

---

## Post-GA (Out of Scope for MVP)

These are explicitly deferred and should not influence earlier iteration decisions:

- **Authentication** — real user accounts (Supabase Auth is already available when needed)
- **Multi-device sync** — naturally unlocked once auth exists
- **Offline support** — local cache with remote sync (AsyncStorage/MMKV + sync layer)
- **Backend hosting** — Railway, Render, or Fly.io (API runs locally until this is needed)
- **Zod validation** — API input validation (add when endpoints are stable)
- **E2E testing (Detox)** — after core flows are stable
- **Analytics / crash reporting** — Sentry or similar
- **Photo attachments** — pet photos and event photos via Supabase Storage
- **Medication reminders** — push notifications for scheduled doses
- **Print support** — timeline printing

---

## Summary

| Iteration | Focus           | Key Value                       |
| --------- | --------------- | ------------------------------- |
| 0         | Foundation      | Both apps running, DB connected |
| 1         | Pet Profiles    | First real data end-to-end      |
| 2         | Conditions      | Complete pet profile            |
| 3         | Symptom Logging | Core health tracking loop       |
| 4         | Diet Tracking   | Full dietary history            |
| 5         | Medications     | Full medication management      |
| 6         | Timeline        | Unified view across all events  |
| 7         | Calendar        | Visual event navigation         |
| 8         | Export          | Shareable vet report            |
