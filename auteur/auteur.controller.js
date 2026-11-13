// Importation du service Auteur
import AuteurService from "./auteur.service.js";

// Controller permettant de gérer les requêtes liées aux auteurs
class AuteurController {

  // CRÉER UN AUTEUR
  static creation = async (req, res) => {
    try {
      const resultat = await AuteurService.creationAuteur(req.body);

      res.status(201).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l'auteur",
        error: error.message
      });
    }
  };


  // RÉCUPÉRER TOUS LES AUTEURS
  static findAll = async (req, res) => {
    try {
      const resultat = await AuteurService.toutAuteur();

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des auteurs",
        error: error.message
      });
    }
  };


  // RÉCUPÉRER UN AUTEUR PAR SON ID
  static findById = async (req, res) => {
    try {
      const resultat = await AuteurService.recuperationId(req.params.id);

      // Si aucun auteur n'est trouvé
      if (!resultat) {
        return res.status(404).json({
          message: "Auteur introuvable"
        });
      }

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'auteur",
        error: error.message
      });
    }
  };


  // MODIFIER UN AUTEUR
  static update = async (req, res) => {
    try {
      const resultat = await AuteurService.update(
        req.params.id,
        req.body
      );

      // Si aucun auteur n'est trouvé
      if (!resultat) {
        return res.status(404).json({
          message: "Auteur introuvable"
        });
      }

      res.status(200).json({
        message: "Auteur modifié avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la modification de l'auteur",
        error: error.message
      });
    }
  };


  // SUPPRIMER UN AUTEUR
  static delete = async (req, res) => {
    try {
      const resultat = await AuteurService.delete(req.params.id);

      // Si aucun auteur n'est trouvé
      if (!resultat) {
        return res.status(404).json({
          message: "Auteur introuvable"
        });
      }

      res.status(200).json({
        message: "Auteur supprimé avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'auteur",
        error: error.message
      });
    }
  };
}

export default AuteurController;