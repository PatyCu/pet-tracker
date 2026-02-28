import { Request, Response } from "express";
import { CreatePetInput } from "@pet-tracker/types";
import { prisma } from "../lib/prisma";
import { DEFAULT_USER_ID } from "../constants";

export async function createPet(req: Request, res: Response): Promise<void> {
  const { name, species, breed, dateOfBirth } = req.body as CreatePetInput;

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
