// Importation du repository Membre
import MembreRepository from "./membre.repository.js";

// Controller permettant de gérer les requêtes liées aux membres
class MembreController {

  // Créer un membre
  static create = async (req, res) => {
    try {
      const membre = await MembreRepository.create(req.body);

      res.status(201).json({
        message: "Membre créé avec succès",
        data: membre
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création du membre",
        error: error.message
      });
    }
  };

  // Récupérer tous les membres
  static findAll = async (req, res) => {
    try {
      const membres = await MembreRepository.findAll();

      res.status(200).json(membres);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des membres",
        error: error.message
      });
    }
  };

  // Récupérer un membre par son ID
  static findOne = async (req, res) => {
    try {
      const membre = await MembreRepository.findById(req.params.id);

      if (!membre) {
        return res.status(404).json({
          message: "Membre introuvable"
        });
      }

      res.status(200).json(membre);

    } catch (error) {
      res.status(500).json({
        message: "Erreur",
        error: error.message
      });
    }
  };

  // Supprimer un membre
  static delete = async (req, res) => {
    try {
      const membre = await MembreRepository.delete(req.params.id);

      if (!membre) {
        return res.status(404).json({
          message: "Membre introuvable"
        });
      }

      res.status(200).json({
        message: "Membre supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression",
        error: error.message
      });
    }
  };
}

export default MembreController;