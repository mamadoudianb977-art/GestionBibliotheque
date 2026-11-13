import { Router } from "express";

import LivreController from "./livre.controller.js";

import livreSchema from "./livre.validate.js";

import validationMiddleware from "../commun/validator.js";

import authMiddleware from "../commun/auth.middleware.js";

import roleMiddleware from "../commun/role.middleware.js";

// Création du routeur
const router = Router();

// CRÉER UN LIVRE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(livreSchema),
  LivreController.creation
);

// RÉCUPÉRER TOUS LES LIVRES
router.get(
  "/",
  LivreController.findAll
);

// RÉCUPÉRER UN LIVRE PAR SON ID
router.get(
  "/:id",
  LivreController.findById
);

// MODIFIER UN LIVRE
// Seul un administrateur peut modifier un livre.
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(livreSchema),
  LivreController.update
);

// SUPPRIMER UN LIVRE
// Seul un administrateur peut supprimer un livre.
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  LivreController.delete
);

// Exportation du routeur
export default router;
