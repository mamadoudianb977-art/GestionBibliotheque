// Importation de Yup
import * as yup from "yup";

// Schéma de validation d'un auteur
const auteurSchema = yup.object({
  
  // Nom obligatoire
  nom: yup
    .string()
    .required("Le nom de l'auteur est obligatoire")
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  // Prénom obligatoire
  prenom: yup
    .string()
    .required("Le prénom de l'auteur est obligatoire")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
});

// Exportation du schéma
export default auteurSchema;