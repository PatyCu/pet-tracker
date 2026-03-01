import { Request, Response } from "express";
import { CreatePetInput } from "@pet-tracker/types";
import { prisma } from "../lib/prisma";
import { DEFAULT_USER_ID } from "../constants";

export async function createPet(req: Request, res: Response): Promise<void> {
  const { name, species, breed, dateOfBirth } = req.body as CreatePetInput;

  if (!name || !species) {
    res.status(400).json({ error: "name and species are required" });
    return;
  }

  const existing = await prisma.pet.findUnique({
    where: { userId_name: { userId: DEFAULT_USER_ID, name } },
  });
  if (existing) {
    res.status(409).json({ error: "A pet with that name already exists" });
    return;
  }

  const pet = await prisma.pet.create({
    data: {
      userId: DEFAULT_USER_ID,
      name,
      species,
      breed: breed ?? null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    },
  });

  res.status(201).json(pet);
}
