import { Router } from "express";
import { listPets, createPet } from "../../controllers/pet.controller";

const router = Router();

router.get("/", listPets);
router.post("/", createPet);

export default router;
