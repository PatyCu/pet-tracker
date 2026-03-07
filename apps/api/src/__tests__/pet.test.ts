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
  await prisma.pet.deleteMany({
    where: { userId: "default-user", name: { in: ["Kiwi", "Dupes", "ToDelete"] } },
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

describe("DELETE /api/v1/pets/:id", () => {
  it("returns 204 and removes the pet", async () => {
    const createRes = await request(app)
      .post("/api/v1/pets")
      .send({ name: "ToDelete", species: "Cat" });
    expect(createRes.status).toBe(201);
    const id = createRes.body.id as string;

    const deleteRes = await request(app).delete(`/api/v1/pets/${id}`);
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get("/api/v1/pets");
    expect(listRes.body.find((p: { id: string }) => p.id === id)).toBeUndefined();
  });

  it("returns 404 for a non-existent id", async () => {
    const res = await request(app).delete("/api/v1/pets/non-existent-id");
    expect(res.status).toBe(404);
  });
});
