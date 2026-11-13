// Importation de Yup
import * as yup from "yup";

// Schéma de validation d'un membre
const membreSchema = yup.object({

  // Nom
  nom: yup
    .string()
    .required("Le nom est obligatoire")
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  // Prénom
  prenom: yup
    .string()
    .required("Le prénom est obligatoire")
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  // Email
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'email est obligatoire"),

  // Téléphone
  telephone: yup
    .string()
    .optional()
});

export default membreSchema;