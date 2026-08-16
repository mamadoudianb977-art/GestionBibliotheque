import { Router } from "express";
import AuteurController from "./auteur.controller.js";

const router = Router();

router.post("/", AuteurController.create);
router.get("/", AuteurController.findAll);
router.get("/:id", AuteurController.findOne);
router.delete("/:id", AuteurController.delete);

export default router;