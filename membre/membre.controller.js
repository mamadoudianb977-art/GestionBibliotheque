// Importation du service Membre
import MembreService from "./membre.service.js";

// Controller permettant de gérer les requêtes liées aux membres
class MembreController {

  // Créer un membre
  static creation = async (req, res) => {
    try {
      const resultat = await MembreService.creationMembre(req.body);

      res.status(201).json(resultat);
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
      const resultat = await MembreService.toutMembre();

      res.status(200).json(resultat);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des membres",
        error: error.message
      });
    }
  };

  // Récupérer un membre par son ID
  static findById = async (req, res) => {
    try {
      const resultat = await MembreService.recuperationId(req.params.id);

      // Vérifier si le membre existe
      if (!resultat) {
        return res.status(404).json({
          message: "Membre introuvable"
        });
      }

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du membre",
        error: error.message
      });
    }
  };

  // Modifier un membre
  static update = async (req, res) => {
    try {
      const resultat = await MembreService.update(
        req.params.id,
        req.body
      );

      // Vérifier si le membre existe
      if (!resultat) {
        return res.status(404).json({
          message: "Membre introuvable"
        });
      }

      res.status(200).json({
        message: "Membre modifié avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la modification du membre",
        error: error.message
      });
    }
  };

  // Supprimer un membre
  static delete = async (req, res) => {
    try {
      const resultat = await MembreService.delete(req.params.id);

      // Vérifier si le membre existe
      if (!resultat) {
        return res.status(404).json({
          message: "Membre introuvable"
        });
      }

      res.status(200).json({
        message: "Membre supprimé avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du membre",
        error: error.message
      });
    }
  };
}

export default MembreController;