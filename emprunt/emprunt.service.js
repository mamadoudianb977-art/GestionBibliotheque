// Importation du repository Emprunt
import empruntRepository from "./emprunt.repository.js";

// Service permettant de gérer la logique métier des emprunts
class EmpruntService {

  // Créer un emprunt
  static creationEmprunt = async (data) => {

    // Vérifier si le livre possède déjà un emprunt en cours
    const empruntEnCours =
      await empruntRepository.findByLivreEnCours(data.livre);

    // Si le livre est déjà emprunté
    if (empruntEnCours) {
      throw new Error(
        "Ce livre est déjà emprunté et n'a pas encore été retourné"
      );
    }

    // Si le livre est disponible, créer l'emprunt
    return await empruntRepository.create(data);
  };

  // Récupérer tous les emprunts
  static toutEmprunt = async () => {
    return await empruntRepository.findAll();
  };

  // Récupérer un emprunt par son ID
  static recuperationId = async (id) => {
    return await empruntRepository.findById(id);
  };

  // Retourner un livre
  static retourLivre = async (id) => {
    return await empruntRepository.retour(id);
  };

  // Supprimer un emprunt
  static delete = async (id) => {
    return await empruntRepository.delete(id);
  };

}

// Exportation du service
export default EmpruntService;