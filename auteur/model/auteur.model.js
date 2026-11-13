import mongoose from "mongoose";

const auteurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },

    prenom: {
      type: String,
      required: true,
      trim: true
    },

    nationalite: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Auteur = mongoose.model("Auteur", auteurSchema);

export default Auteur;