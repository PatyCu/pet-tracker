import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";

const createdPetIds: string[] = [];

beforeAll(async () => {
  await prisma.user.upsert({
    where: { id: "default-user" },
    update: {},
    create: { id: "default-user", name: "Paty" },
  });
  // Remove any pets left from previous test runs to ensure clean state
  await prisma.pet.deleteMany({
    where: { userId: "default-user", name: { in: ["Kiwi", "Dupes"] } },
  });
});

afterAll(async () => {
  if (createdPetIds.length > 0) {
    await prisma.pet.deleteMany({ where: { id: { in: createdPetIds } } });
  }
  await prisma.$disconnect();
});

describe("POST /api/v1/pets", () => {
  it("returns 201 with the created pet for a valid body", async () => {
    const res = await request(app).post("/api/v1/pets").send({ name: "Kiwi", species: "Cat" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: "Kiwi", species: "Cat" });
    createdPetIds.push(res.body.id as string);
  });

  it("returns 400 when name is missing", async () => {
    const res = await request(app).post("/api/v1/pets").send({ species: "Cat" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when species is missing", async () => {
    const res = await request(app).post("/api/v1/pets").send({ name: "Kiwi" });

    expect(res.status).toBe(400);
  });

  it("returns 409 when a pet with the same name already exists", async () => {
    const first = await request(app).post("/api/v1/pets").send({ name: "Dupes", species: "Dog" });
    expect(first.status).toBe(201);
    createdPetIds.push(first.body.id as string);

    const res = await request(app).post("/api/v1/pets").send({ name: "Dupes", species: "Dog" });
    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already exists/i);
  });
});
