import mongoose from "mongoose";

const membreSchema = new mongoose.Schema(
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

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    telephone: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Membre = mongoose.model("Membre", membreSchema);

export default Membre;