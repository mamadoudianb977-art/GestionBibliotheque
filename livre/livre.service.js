import LivreRepository from "./livre.repository.js";

// Service contenant la logique métier des livres
class LivreService {

  // CRÉER UN LIVRE
  async creationLivre(data) {
    return await LivreRepository.create(data);
  }

  // RÉCUPÉRER TOUS LES LIVRES
  async toutLivre() {
    return await LivreRepository.findAll();
  }

  // RÉCUPÉRER UN LIVRE PAR ID
  async recuperationId(id) {
    return await LivreRepository.findById(id);
  }

  // MODIFIER UN LIVRE
  async update(id, data) {
    return await LivreRepository.update(id, data);
  }

  // SUPPRIMER UN LIVRE
  async delete(id) {
    return await LivreRepository.delete(id);
  }
}

// Exportation du service
export default new LivreService();