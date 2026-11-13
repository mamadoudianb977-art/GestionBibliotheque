import mongoose from "mongoose";

const empruntSchema = new mongoose.Schema(
  {
    livre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livre",
      required: true
    },

    membre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre",
      required: true
    },

    dateEmprunt: {
      type: Date,
      default: Date.now
    },

    dateRetourPrevue: {
      type: Date,
      required: true
    },

    dateRetour: {
      type: Date,
      default: null
    },

    statut: {
      type: String,
      enum: ["en cours", "retourne"],
      default: "en cours"
    }
  },
  {
    timestamps: true
  }
);

const Emprunt = mongoose.model("Emprunt", empruntSchema);

export default Emprunt;