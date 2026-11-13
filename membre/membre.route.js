// Importation de Router depuis Express
import { Router } from "express";

// Importation du controller Membre
import MembreController from "./membre.controller.js";

// Importation du schéma de validation Membre
import membreSchema from "./membre.validate.js";

// Importation du middleware de validation
import validationMiddleware from "../commun/validator.js";

// Importation du middleware JWT
import authMiddleware from "../commun/auth.middleware.js";

// Importation du middleware de rôle
import roleMiddleware from "../commun/role.middleware.js";

// Création du routeur
const router = Router();

// CRÉER UN MEMBRE
// Création d'un membre
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(membreSchema),
  MembreController.creation
);

// RÉCUPÉRER TOUS LES MEMBRES
router.get(
  "/",
  MembreController.findAll
);

// RÉCUPÉRER UN MEMBRE PAR SON ID
router.get(
  "/:id",
  MembreController.findById
);

// MODIFIER UN MEMBRE
// Seul un administrateur peut modifier un membre.
// 1. authMiddleware vérifie le JWT
// 2. roleMiddleware vérifie que le rôle est "admin"
// 3. validationMiddleware vérifie les données
// 4. MembreController.update modifie le membre
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(membreSchema),
  MembreController.update
);

// SUPPRIMER UN MEMBRE
// Seul un administrateur peut supprimer un membre.
// 1. authMiddleware vérifie le JWT
// 2. roleMiddleware vérifie le rôle "admin"
// 3. MembreController.delete supprime le membre
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  MembreController.delete
);

// Exportation du routeur
export default router;