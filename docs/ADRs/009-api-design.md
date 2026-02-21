# ADR 009 - API Design

**Date:** 2026-02-18
**Status:** Accepted

## Context

Pet Tracker requires a backend API to expose CRUD operations for pets and health events, as well as derived views (calendar, timeline) for the UI. Decisions were needed on API style, versioning, and internal code organisation.

## Decisions

### REST over GraphQL

**Chosen:** REST.

**Rationale:**

- Straightforward to implement with Express
- No additional tooling or learning overhead
- The data model is simple and relational — REST maps naturally to it
- GraphQL's benefits (flexible queries, reduced over-fetching) are not justified at this scale

---

### Versioning from Day One

**Chosen:** All routes versioned under `/api/v1/`.

**Rationale:**

- Cheap to add upfront, expensive to retrofit later
- When auth is introduced (post-GA), it may require breaking changes to response shapes — having `/api/v2/` available makes this clean
- Consistent with industry convention

**Example:** `GET /api/v1/pets/:id/symptoms`

---

### Resource Nesting

All health event routes are nested under `/pets/:id/`:

```
/api/v1/pets/:id/symptoms
/api/v1/pets/:id/diet-changes
/api/v1/pets/:id/medications
/api/v1/pets/:id/medications/:medicationId/intakes
```

**Rationale:**

- Events are always accessed in the context of a specific pet
- Nesting makes the ownership relationship explicit in the URL
- Prevents accidental cross-pet data access

---

### Dedicated Calendar and Timeline Endpoints

Rather than having the frontend aggregate multiple calls, two purpose-built endpoints are provided:

- **`GET /api/v1/pets/:id/calendar?month=YYYY-MM`** — returns events grouped by day for a given month, optimised for the calendar UI
- **`GET /api/v1/pets/:id/timeline`** — returns all events as a flat chronological list, optimised for the vet report use case
- **`GET /api/v1/pets/:id/timeline/export`** — exportable version of the timeline (PDF/share)

**Rationale:**

- Avoids N+1 requests from the client (one call per event type per day)
- Server-side aggregation is more efficient and easier to paginate
- Keeps frontend code simple

---

### Routes vs Controllers Separation

Route files (`src/routes/v1/*.ts`) only handle HTTP wiring — method, path, and middleware chain. All business logic and Prisma calls live in controller files (`src/controllers/*.ts`).

**Rationale:**

- Controllers are independently testable without spinning up an HTTP server
- Route files remain readable and declarative
- Consistent with Express best practices

---

### Prisma Client Singleton

A single Prisma client instance is created in `src/lib/prisma.ts` and imported wherever needed.

**Rationale:**

- Prevents connection pool exhaustion from multiple client instantiations
- Standard Prisma best practice for Express applications

---

### Global Error Handling

All errors are funnelled through `src/middleware/error.middleware.ts`.

**Rationale:**

- Consistent error response shape across all endpoints
- Prisma errors (e.g. record not found, unique constraint violation) are caught and mapped to appropriate HTTP status codes in one place

## Full Route Reference

| Method | Route                                                          | Description                              |
| ------ | -------------------------------------------------------------- | ---------------------------------------- |
| GET    | `/api/v1/pets`                                                 | List all pets                            |
| POST   | `/api/v1/pets`                                                 | Create a pet                             |
| GET    | `/api/v1/pets/:id`                                             | Get a pet with full profile              |
| PUT    | `/api/v1/pets/:id`                                             | Update pet profile                       |
| DELETE | `/api/v1/pets/:id`                                             | Delete a pet                             |
| POST   | `/api/v1/pets/:id/conditions`                                  | Add a condition                          |
| PUT    | `/api/v1/pets/:id/conditions/:conditionId`                     | Update a condition                       |
| DELETE | `/api/v1/pets/:id/conditions/:conditionId`                     | Remove a condition                       |
| GET    | `/api/v1/pets/:id/symptoms`                                    | List symptoms (filterable by date range) |
| POST   | `/api/v1/pets/:id/symptoms`                                    | Log a symptom                            |
| PUT    | `/api/v1/pets/:id/symptoms/:symptomId`                         | Edit a symptom                           |
| DELETE | `/api/v1/pets/:id/symptoms/:symptomId`                         | Delete a symptom                         |
| GET    | `/api/v1/pets/:id/diet-changes`                                | List diet changes                        |
| POST   | `/api/v1/pets/:id/diet-changes`                                | Log a diet change                        |
| PUT    | `/api/v1/pets/:id/diet-changes/:changeId`                      | Edit a diet change                       |
| DELETE | `/api/v1/pets/:id/diet-changes/:changeId`                      | Delete a diet change                     |
| GET    | `/api/v1/pets/:id/medications`                                 | List medications                         |
| POST   | `/api/v1/pets/:id/medications`                                 | Add a medication                         |
| PUT    | `/api/v1/pets/:id/medications/:medicationId`                   | Edit a medication                        |
| DELETE | `/api/v1/pets/:id/medications/:medicationId`                   | Delete a medication                      |
| GET    | `/api/v1/pets/:id/medications/:medicationId/intakes`           | List intake logs                         |
| POST   | `/api/v1/pets/:id/medications/:medicationId/intakes`           | Log a medication intake                  |
| DELETE | `/api/v1/pets/:id/medications/:medicationId/intakes/:intakeId` | Remove an intake log                     |
| GET    | `/api/v1/pets/:id/calendar?month=YYYY-MM`                      | Events grouped by day for a given month  |
| GET    | `/api/v1/pets/:id/timeline`                                    | All events chronologically               |
| GET    | `/api/v1/pets/:id/timeline/export`                             | Exportable timeline for vet report       |

## Consequences

- All new endpoints must be added under `/api/v1/`
- Route files must stay free of business logic
- Zod validation middleware (deferred to post-MVP) will be inserted between route and controller
- The base API URL must be configurable via environment variable in the mobile app to support local dev, staging, and production environments
