// Importation du repository Emprunt
import EmpruntRepository from "./emprunt.repository.js";

// Controller permettant de gérer les requêtes liées aux emprunts
class EmpruntController {

  // Créer un emprunt
  static create = async (req, res) => {
    try {
      const emprunt = await EmpruntRepository.create(req.body);

      res.status(201).json({
        message: "Emprunt enregistré avec succès",
        data: emprunt
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement de l'emprunt",
        error: error.message
      });
    }
  };

  // Récupérer tous les emprunts
  static findAll = async (req, res) => {
    try {
      const emprunts = await EmpruntRepository.findAll();

      res.status(200).json(emprunts);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des emprunts",
        error: error.message
      });
    }
  };

  // Retourner un livre
  static retour = async (req, res) => {
    try {
      const emprunt = await EmpruntRepository.retour(req.params.id);

      if (!emprunt) {
        return res.status(404).json({
          message: "Emprunt introuvable"
        });
      }

      res.status(200).json({
        message: "Livre retourné avec succès",
        data: emprunt
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors du retour",
        error: error.message
      });
    }
  };

  // Supprimer un emprunt
  static delete = async (req, res) => {
    try {
      const emprunt = await EmpruntRepository.delete(req.params.id);

      if (!emprunt) {
        return res.status(404).json({
          message: "Emprunt introuvable"
        });
      }

      res.status(200).json({
        message: "Emprunt supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression",
        error: error.message
      });
    }
  };
}

export default EmpruntController;