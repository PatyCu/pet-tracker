import { Router } from "express";
import { listPets, createPet, deletePet } from "../../controllers/pet.controller";

const router = Router();

router.get("/", listPets);
router.post("/", createPet);
router.delete("/:id", deletePet);

export default router;
