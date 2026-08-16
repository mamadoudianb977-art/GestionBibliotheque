import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/database.js";

import auteurRoute from "./auteur/auteur.route.js";
import livreRoute from "./livre/livre.route.js";
import membreRoute from "./membre/membre.route.js";
import empruntRoute from "./emprunt/emprunt.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "API GestionBibliotheque fonctionne correctement"
  });
});

app.use("/api/auteurs", auteurRoute);
app.use("/api/livres", livreRoute);
app.use("/api/membres", membreRoute);
app.use("/api/emprunts", empruntRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Serveur démarré sur http://localhost:${PORT}');
});