import { Router } from "express";

import EmpruntController from "./emprunt.controller.js";

import empruntSchema from "./emprunt.validate.js";

import validationMiddleware from "../commun/validator.js";

import authMiddleware from "../commun/auth.middleware.js";

import roleMiddleware from "../commun/role.middleware.js";

const router = Router();

// CRÉER UN EMPRUNT
//Seul un utilisateur connecté peut créer un emprunt.
router.post(
  "/",
  authMiddleware,
  validationMiddleware(empruntSchema),
  EmpruntController.creation
);

// RÉCUPÉRER TOUS LES EMPRUNTS
router.get(
  "/",
  EmpruntController.findAll
);

// RÉCUPÉRER UN EMPRUNT PAR ID
router.get(
  "/:id",
  EmpruntController.findById
);

// RETOURNER UN LIVRE
// Utilisateur connecté.
router.put(
  "/:id/retour",
  authMiddleware,
  EmpruntController.retour
);

// SUPPRIMER UN EMPRUNT
// Seul l'administrateur peut supprimer.
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  EmpruntController.delete
);

export default router;