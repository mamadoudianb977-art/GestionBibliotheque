import * as yup from "yup";

// Schéma de validation des données d'un utilisateur

const userSchema = yup.object({

  // Validation du nom
  nom: yup
    .string()
    .required("Le nom de l'utilisateur est obligatoire")
    .trim(),

  // Validation du prénom
  prenom: yup
    .string()
    .required("Le prénom de l'utilisateur est obligatoire")
    .trim(),

  // Validation de l'adresse email
  email: yup
    .string()
    .email("L'adresse email est invalide")
    .required("L'email est obligatoire")
    .trim()
    .lowercase(),

  // Validation du mot de passe
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),

  // Validation du rôle
  role: yup
    .string()
    .oneOf(
      ["admin", "membre"],
      "Le rôle doit être 'admin' ou 'membre'"
    )
});

export default userSchema;