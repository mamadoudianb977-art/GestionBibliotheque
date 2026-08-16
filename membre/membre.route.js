import { Router } from "express";
import MembreController from "./membre.controller.js";

const router = Router();

router.post("/", MembreController.create);
router.get("/", MembreController.findAll);
router.get("/:id", MembreController.findOne);
router.delete("/:id", MembreController.delete);

export default router;