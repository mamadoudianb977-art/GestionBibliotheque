import mongoose from "mongoose";

// Schéma MongoDB des utilisateurs
const userSchema = new mongoose.Schema(
  {
    // Nom de l'utilisateur
    nom: {
      type: String,
      required: true,
      trim: true
    },

    // Prénom de l'utilisateur
    prenom: {
      type: String,
      required: true,
      trim: true
    },

    // Adresse email
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    // Mot de passe
    // Il sera enregistré sous forme de hash avec bcrypt
    password: {
      type: String,
      required: true
    },

    // Rôle de l'utilisateur
    // Par défaut, un nouvel utilisateur est un membre
    role: {
      type: String,
      enum: ["admin", "membre"],
      default: "membre"
    }
  },
  {
    // Création automatique de createdAt et updatedAt
    timestamps: true
  }
);

// Création du modèle User
const User = mongoose.model("User", userSchema);

export default User;