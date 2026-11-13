// Importation de Yup
import * as yup from "yup";

// Schéma de validation d'un livre
const livreSchema = yup.object({

  // Titre du livre
  titre: yup
    .string()
    .required("Le titre du livre est obligatoire")
    .min(2, "Le titre doit contenir au moins 2 caractères"),

  // ISBN du livre
  isbn: yup
    .string()
    .required("L'ISBN du livre est obligatoire"),

  // Année de publication
  anneePublication: yup
    .number()
    .typeError("L'année de publication doit être un nombre")
    .required("L'année de publication est obligatoire"),

  // Identifiant de l'auteur
  auteur: yup
    .string()
    .required("L'auteur est obligatoire")
});

// Exportation du schéma
export default livreSchema;