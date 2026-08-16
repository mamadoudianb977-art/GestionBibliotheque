import { Router } from "express";
import EmpruntController from "./emprunt.controller.js";

const router = Router();

router.post("/", EmpruntController.create);
router.get("/", EmpruntController.findAll);
router.put("/:id/retour", EmpruntController.retour);
router.delete("/:id", EmpruntController.delete);

export default router;