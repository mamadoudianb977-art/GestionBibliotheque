// Importation du modèle Emprunt
import Emprunt from "./model/emprunt.model.js";

// Repository permettant de gérer les opérations MongoDB des emprunts
class EmpruntRepository {

  // Créer un emprunt
  static create = async (data) => {
    return await Emprunt.create(data);
  };

  // Vérifier si le livre possède déjà un emprunt en cours
  static findByLivreEnCours = async (livreId) => {
    return await Emprunt.findOne({
      livre: livreId,
      statut: "en cours"
    });
  };

  // Récupérer tous les emprunts
  static findAll = async () => {
    return await Emprunt.find()
      .populate("livre")
      .populate("membre");
  };

  // Récupérer un emprunt par son ID
  static findById = async (id) => {
    return await Emprunt.findById(id)
      .populate("livre")
      .populate("membre");
  };

  // Retourner un livre
  static retour = async (id) => {
    return await Emprunt.findByIdAndUpdate(
      id,
      {
        dateRetour: new Date(),
        statut: "retourne"
      },
      {
        new: true
      }
    );
  };

  // Supprimer un emprunt
  static delete = async (id) => {
    return await Emprunt.findByIdAndDelete(id);
  };

}

// Exportation du repository
export default EmpruntRepository;