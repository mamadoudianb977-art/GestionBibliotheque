// Importation du repository Auteur
import auteurRepository from "./auteur.repository.js";

// Service permettant de gérer la logique métier des auteurs
class AuteurService {

  // Création d'un auteur
  static creationAuteur = async (data) => {
    const resultat = await auteurRepository.create(data);

    return resultat;
  };

  // Récupération d'un auteur par son ID
  static recuperationId = async (id) => {
    const resultat = await auteurRepository.findById(id);

    return resultat;
  };

  // Récupération de tous les auteurs
  static toutAuteur = async () => {
    const resultat = await auteurRepository.findAll();

    return resultat;
  };

  // Modifier un auteur
  static update = async (id, data) => {
    const resultat = await auteurRepository.update(id, data);

    return resultat;
  };

  // Suppression d'un auteur
  static delete = async (id) => {
    const resultat = await auteurRepository.delete(id);

    return resultat;
  };
}

export default AuteurService;