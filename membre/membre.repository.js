// Importation du modèle Membre
import Membre from "./model/membre.model.js";

// Repository permettant de gérer les opérations MongoDB des membres
class MembreRepository {

  // Créer un membre
  static create = async (data) => {
    return await Membre.create(data);
  };

  // Récupérer tous les membres
  static findAll = async () => {
    return await Membre.find();
  };

  // Récupérer un membre par son ID
  static findById = async (id) => {
    return await Membre.findById(id);
  };

  // Supprimer un membre
  static delete = async (id) => {
    return await Membre.findByIdAndDelete(id);
  };
}

export default MembreRepository;