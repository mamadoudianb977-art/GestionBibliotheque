// Importation du modèle Livre
import Livre from "./model/livre.model.js";

// Repository permettant de gérer les opérations MongoDB des livres
class LivreRepository {

  // CRÉER UN LIVRE
  static create = async (data) => {
    return await Livre.create(data);
  };

  // RÉCUPÉRER TOUS LES LIVRES
  // populate("auteur") permet de récupérer
  // les informations complètes de l'auteur.
  static findAll = async () => {
    return await Livre.find().populate("auteur");
  };

  // RÉCUPÉRER UN LIVRE PAR SON ID
  static findById = async (id) => {
    return await Livre.findById(id).populate("auteur");
  };

  // MODIFIER UN LIVRE
  // findByIdAndUpdate recherche le livre par son ID
  // puis applique les nouvelles données.
  // { new: true } permet de retourner le livre
  // après sa modification.
  static update = async (id, data) => {
    return await Livre.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    ).populate("auteur");
  };

  // SUPPRIMER UN LIVRE
  static delete = async (id) => {
    return await Livre.findByIdAndDelete(id);
  };

}

// Exportation du repository
export default LivreRepository;
