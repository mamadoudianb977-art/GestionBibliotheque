// Importation du repository Livre
import LivreRepository from "./livre.repository.js";

// Controller permettant de gérer les requêtes liées aux livres
class LivreController {

  // Créer un livre
  static create = async (req, res) => {
    try {
      const livre = await LivreRepository.create(req.body);

      res.status(201).json({
        message: "Livre créé avec succès",
        data: livre
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création du livre",
        error: error.message
      });
    }
  };

  // Récupérer tous les livres
  static findAll = async (req, res) => {
    try {
      const livres = await LivreRepository.findAll();

      res.status(200).json(livres);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des livres",
        error: error.message
      });
    }
  };

  // Récupérer un livre par son ID
  static findOne = async (req, res) => {
    try {
      const livre = await LivreRepository.findById(req.params.id);

      if (!livre) {
        return res.status(404).json({
          message: "Livre introuvable"
        });
      }

      res.status(200).json(livre);

    } catch (error) {
      res.status(500).json({
        message: "Erreur",
        error: error.message
      });
    }
  };

  // Supprimer un livre
  static delete = async (req, res) => {
    try {
      const livre = await LivreRepository.delete(req.params.id);

      if (!livre) {
        return res.status(404).json({
          message: "Livre introuvable"
        });
      }

      res.status(200).json({
        message: "Livre supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression",
        error: error.message
      });
    }
  };
}

export default LivreController;