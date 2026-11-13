// Importation de dotenv
import dotenv from "dotenv";

// Importation de Chalk pour colorer les messages du terminal
import chalk from "chalk";

// Importation de l'application Express
import app from "./app.js";

// Importation de la connexion MongoDB
import connectDB from "./config/database.js";

// Chargement des variables du fichier .env
dotenv.config();

// Récupération du port depuis le fichier .env
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

// Démarrage du serveur
app.listen(PORT, () => {

  console.log(
    chalk.green(`✓ Serveur démarré sur http://localhost:${PORT}`)
  );

});