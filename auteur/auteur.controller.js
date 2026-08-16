// Importation du repository Auteur
import AuteurRepository from "./auteur.repository.js";

// Controller permettant de gérer les requêtes liées aux auteurs
class AuteurController {

  // Créer un auteur
  static create = async (req, res) => {
    try {
      const auteur = await AuteurRepository.create(req.body);

      res.status(201).json({
        message: "Auteur créé avec succès",
        data: auteur
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l'auteur",
        error: error.message
      });
    }
  };

  // Récupérer tous les auteurs
  static findAll = async (req, res) => {
    try {
      const auteurs = await AuteurRepository.findAll();

      res.status(200).json(auteurs);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des auteurs",
        error: error.message
      });
    }
  };

  // Récupérer un auteur par son ID
  static findOne = async (req, res) => {
    try {
      const auteur = await AuteurRepository.findById(req.params.id);

      if (!auteur) {
        return res.status(404).json({
          message: "Auteur introuvable"
        });
      }

      res.status(200).json(auteur);

    } catch (error) {
      res.status(500).json({
        message: "Erreur",
        error: error.message
      });
    }
  };

  // Supprimer un auteur
  static delete = async (req, res) => {
    try {
      const auteur = await AuteurRepository.delete(req.params.id);

      if (!auteur) {
        return res.status(404).json({
          message: "Auteur introuvable"
        });
      }

      res.status(200).json({
        message: "Auteur supprimé avec succès"
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression",
        error: error.message
      });
    }
  };
}

export default AuteurController;