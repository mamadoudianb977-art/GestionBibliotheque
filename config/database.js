import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(" Connexion à MongoDB réussie");
  } catch (error) {
    console.error(" Erreur MongoDB :", error.message);
    process.exit(1);
  }
};

export default connectDB;