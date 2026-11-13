// Importation du repository Membre
import membreRepository from "./membre.repository.js";

// Service permettant de gérer la logique métier des membres
class MembreService {

  // Création d'un membre
  static creationMembre = async (data) => {
    const resultat = await membreRepository.create(data);

    return resultat;
  };

  // Récupération d'un membre par son ID
  static recuperationId = async (id) => {
    const resultat = await membreRepository.findById(id);

    return resultat;
  };

  // Récupération de tous les membres
  static toutMembre = async () => {
    const resultat = await membreRepository.findAll();

    return resultat;
  };

  // Modification d'un membre
  static update = async (id, data) => {
    const resultat = await membreRepository.update(id, data);

    return resultat;
  };

  // Suppression d'un membre
  static delete = async (id) => {
    const resultat = await membreRepository.delete(id);

    return resultat;
  };
}

export default MembreService;