import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import { listPets } from "../pet.controller";

vi.mock("../../lib/prisma", () => ({
  prisma: {
    pet: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "../../lib/prisma";

const mockFindMany = vi.mocked(prisma.pet.findMany);

function makeRes() {
  const res = { json: vi.fn() } as unknown as Response;
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
