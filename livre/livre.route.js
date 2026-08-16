import { Router } from "express";
import LivreController from "./livre.controller.js";

const router = Router();

router.post("/", LivreController.create);
router.get("/", LivreController.findAll);
router.get("/:id", LivreController.findOne);
router.delete("/:id", LivreController.delete);

export default router;