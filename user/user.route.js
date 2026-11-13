import { Router } from "express";

import UserController from "./user.controller.js";

import userSchema from "./user.validate.js";

import validationMiddleware from "../commun/validator.js";

import authMiddleware from "../commun/auth.middleware.js";

import roleMiddleware from "../commun/role.middleware.js";

// Création du routeur
const router = Router();


// Créer un utilisateur
router.post(
  "/",
  validationMiddleware(userSchema),
  UserController.create
);


// Connexion d'un utilisateur
router.post(
  "/login",
  UserController.login
);


// Récupérer tous les utilisateurs
router.get(
  "/",
  UserController.findAll
);


// Récupérer un utilisateur par son ID
router.get(
  "/:id",
  UserController.findById
);


// Modifier un utilisateur
// Seul un administrateur peut modifier
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware(userSchema),
  UserController.update
);


// Supprimer un utilisateur
// Seul un administrateur peut supprimer
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  UserController.delete
);


export default router;