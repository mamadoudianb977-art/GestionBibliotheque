// Importation de Router depuis Express
import { Router } from "express";

// Importation du controller Auteur
import AuteurController from "./auteur.controller.js";

// Importation du schéma de validation Auteur
import auteurSchema from "./auteur.validate.js";

// Middleware de validation
import validationMiddleware from "../commun/validator.js";

// Middleware JWT
import authMiddleware from "../commun/auth.middleware.js";

// Middleware de vérification du rôle
import roleMiddleware from "../commun/role.middleware.js";

// Création du routeur
const router = Router();

// CRÉER UN AUTEUR
// Seul un administrateur connecté peut créer un auteur.
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(auteurSchema),
  AuteurController.creation
);

// RÉCUPÉRER TOUS LES AUTEURS
// Cette route reste publique.
router.get(
  "/",
  AuteurController.findAll
);

// RÉCUPÉRER UN AUTEUR PAR SON ID
// Cette route reste publique.
router.get(
  "/:id",
  AuteurController.findById
);

// MODIFIER UN AUTEUR
// Seul un administrateur connecté peut modifier.
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(auteurSchema),
  AuteurController.update
);

// SUPPRIMER UN AUTEUR
// Seul un administrateur connecté peut supprimer.
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  AuteurController.delete
);

// Exportation du routeur
export default router;