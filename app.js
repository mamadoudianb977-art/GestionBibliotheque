// Importation d'Express
import express from "express";

// Importation de CORS
import cors from "cors";

// Importation de Morgan pour afficher les requêtes HTTP
import morgan from "morgan";

// Importation des routes
import auteurRoute from "./auteur/auteur.route.js";
import livreRoute from "./livre/livre.route.js";
import membreRoute from "./membre/membre.route.js";
import empruntRoute from "./emprunt/emprunt.route.js";
import userRoute from "./user/user.route.js";

// Création de l'application Express
const app = express();

// Autoriser les requêtes provenant d'autres applications
app.use(cors());

// Permettre à Express de recevoir des données JSON
app.use(express.json());

// Morgan affiche les requêtes HTTP dans le terminal
// Exemple : GET /api/users 200
app.use(morgan("dev"));

// Route d'accueil
app.get("/", (req, res) => {
  res.json({
    message: "API GestionBibliotheque fonctionne correctement"
  });
});

// Routes de l'application
app.use("/api/auteurs", auteurRoute);
app.use("/api/livres", livreRoute);
app.use("/api/membres", membreRoute);
app.use("/api/emprunts", empruntRoute);
app.use("/api/users", userRoute);

// Exportation de l'application
// IMPORTANT : app.js ne contient PAS app.listen()
// et ne se connecte PAS à MongoDB.
export default app;