// Importation du modèle Auteur
import Auteur from "./model/auteur.model.js";

// Repository permettant de gérer les opérations MongoDB des auteurs
class AuteurRepository {

  // Créer un nouvel auteur
  static create = async (data) => {
    return await Auteur.create(data);
  };

  // Récupérer tous les auteurs
  static findAll = async () => {
    return await Auteur.find();
  };

  // Récupérer un auteur par son ID
  static findById = async (id) => {
    return await Auteur.findById(id);
  };

  // Modifier un auteur
  static update = async (id, data) => {
    return await Auteur.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  };

  // Supprimer un auteur
  static delete = async (id) => {
    return await Auteur.findByIdAndDelete(id);
  };
}

export default AuteurRepository;