import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "./user.repository.js";

// Service contenant toute la logique métier des utilisateurs
class UserService {

  // CRÉER UN UTILISATEUR
  async create(data) {

    // Récupération du mot de passe envoyé
    const password = data.password;

    // Hachage du mot de passe avec bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Préparation des données à enregistrer
    const userData = {
      ...data,
      password: passwordHash
    };

    // Enregistrement de l'utilisateur dans MongoDB
    return await UserRepository.create(userData);
  }


  // CONNEXION D'UN UTILISATEUR
  async login(email, password) {

    // Recherche de l'utilisateur avec son email
    const user = await UserRepository.findByEmail(email);

    // Si l'utilisateur n'existe pas
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Comparaison du mot de passe envoyé avec le hash
    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    // Si le mot de passe est incorrect
    if (!passwordCorrect) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Création du token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Réponse de connexion
    return {
      message: "Connexion réussie",
      token: token,

      utilisateur: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    };
  }


  // RÉCUPÉRER TOUS LES UTILISATEURS
  async findAll() {
    return await UserRepository.findAll();
  }


  // RÉCUPÉRER UN UTILISATEUR PAR SON ID
  async findById(id) {
    return await UserRepository.findById(id);
  }


  // MODIFIER UN UTILISATEUR
  async update(id, data) {

    // On prépare les données à modifier
    const userData = {
      ...data
    };

    // Si un nouveau mot de passe est fourni,
    // on le hache avant de l'enregistrer
    if (data.password) {
      userData.password = await bcrypt.hash(data.password, 10);
    }

    // Modification dans MongoDB
    return await UserRepository.update(id, userData);
  }


  // SUPPRIMER UN UTILISATEUR
  async delete(id) {
    return await UserRepository.delete(id);
  }
}

// Exportation du service
export default new UserService();