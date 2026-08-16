// Importation du modèle Auteur
import Auteur from "./model/auteur.model.js";

// Classe permettant de gérer les opérations avec la collection Auteur
class AuteurRepository {

  // Créer un nouvel auteur
  static create = async (data) => {
    return await Auteur.create(data);
  };

  // Récupérer tous les auteurs
  static findAll = async () => {
    return await Auteur.find();
  };

  // Récupérer un auteur par son identifiant
  static findById = async (id) => {
    return await Auteur.findById(id);
  };

  // Supprimer un auteur
  static delete = async (id) => {
    return await Auteur.findByIdAndDelete(id);
  };
}

export default AuteurRepository;