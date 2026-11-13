import * as yup from "yup";

const empruntSchema = yup.object({

  // ID du livre
  livre: yup
    .string()
    .required("Le livre est obligatoire"),

  // ID du membre
  membre: yup
    .string()
    .required("Le membre est obligatoire"),

  // La date d'emprunt est automatique grâce au modèle
  dateEmprunt: yup
    .date()
    .nullable(),

  // Date prévue du retour
  dateRetourPrevue: yup
    .date()
    .required("La date de retour prévue est obligatoire"),

  // Date réelle du retour
  dateRetour: yup
    .date()
    .nullable(),

  // Statut
  statut: yup
    .string()
    .oneOf(
      ["en cours", "retourne"],
      "Le statut doit être 'en cours' ou 'retourne'"
    )
    .default("en cours")
});

export default empruntSchema;