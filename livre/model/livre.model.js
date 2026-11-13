import mongoose from "mongoose";

const livreSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    anneePublication: {
      type: Number
    },

    genre: {
      type: String,
      trim: true
    },

    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auteur",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Livre = mongoose.model("Livre", livreSchema);

export default Livre;