import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import { listPets, deletePet } from "../pet.controller";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    pet: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { prisma } from "../../lib/prisma";

const mockFindMany = vi.mocked(prisma.pet.findMany);
const mockFindUnique = vi.mocked(prisma.pet.findUnique);
const mockDelete = vi.mocked(prisma.pet.delete);

function makeRes() {
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  } as unknown as Response;
  return res;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("listPets", () => {
  it("returns all pets for the default user ordered by createdAt asc", async () => {
    const pets = [
      {
        id: "1",
        userId: "default-user",
        name: "Kiwi",
        species: "Cat",
        breed: null,
        dateOfBirth: null,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        userId: "default-user",
        name: "Mochi",
        species: "Dog",
        breed: "Shiba",
        dateOfBirth: null,
        createdAt: new Date("2024-02-01"),
      },
    ];
    mockFindMany.mockResolvedValue(pets as never);

    const req = {} as Request;
    const res = makeRes();

    await listPets(req, res);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: { userId: "default-user" },
      orderBy: { createdAt: "asc" },
    });
    expect(res.json).toHaveBeenCalledWith(pets);
  });

  it("returns an empty array when the user has no pets", async () => {
    mockFindMany.mockResolvedValue([] as never);

    const req = {} as Request;
    const res = makeRes();

    await listPets(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe("deletePet", () => {
  it("returns 204 when the pet exists and belongs to the default user", async () => {
    mockFindUnique.mockResolvedValue({
      id: "1",
      userId: "default-user",
      name: "Kiwi",
      species: "Cat",
      breed: null,
      dateOfBirth: null,
      createdAt: new Date(),
    } as never);
    mockDelete.mockResolvedValue({} as never);

    const req = { params: { id: "1" } } as unknown as Request;
    const res = makeRes();

    await deletePet(req, res);

    expect(mockDelete).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("returns 404 when the pet does not exist", async () => {
    mockFindUnique.mockResolvedValue(null as never);

    const req = { params: { id: "non-existent" } } as unknown as Request;
    const res = makeRes();

    await deletePet(req, res);

    expect(mockDelete).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Pet not found" });
  });
});
