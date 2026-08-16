// Importation du modèle Livre
import Livre from "./model/livre.model.js";

// Repository permettant de gérer les opérations MongoDB des livres
class LivreRepository {

  // Créer un livre
  static create = async (data) => {
    return await Livre.create(data);
  };

  // Récupérer tous les livres avec leurs auteurs
  static findAll = async () => {
    return await Livre.find().populate("auteur");
  };

  // Récupérer un livre par son ID
  static findById = async (id) => {
    return await Livre.findById(id).populate("auteur");
  };

  // Supprimer un livre
  static delete = async (id) => {
    return await Livre.findByIdAndDelete(id);
  };
}

export default LivreRepository;