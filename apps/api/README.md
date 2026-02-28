# Pet Tracker API

Node.js + Express backend for Pet Tracker. Connects to a PostgreSQL database via Prisma.

## Prerequisites

- Node.js 20+
- pnpm
- A PostgreSQL database (Supabase recommended)

## Setup

### 1. Environment variables

Create `apps/api/.env`:

```
DATABASE_URL=your_supabase_postgres_connection_string
```

### 2. Push schema to database

```bash
pnpm --filter @pet-tracker/api prisma:push
```

### 3. Seed the database

**Required before running the app or tests.** Seeds the `default-user` row that all pets are linked to.

```bash
pnpm --filter @pet-tracker/api prisma:seed
```

## Running

```bash
pnpm --filter @pet-tracker/api dev
# API runs on http://localhost:3000
```

## Testing

```bash
pnpm --filter @pet-tracker/api test
```

Tests run against the live Supabase dev database. `beforeAll` ensures `default-user` exists; `afterAll` cleans up test pets.

## API Routes

| Method | Route          | Description  |
| ------ | -------------- | ------------ |
| GET    | `/health`      | Health check |
| POST   | `/api/v1/pets` | Create a pet |
