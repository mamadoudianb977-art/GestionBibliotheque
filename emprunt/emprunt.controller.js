// Importation du service Emprunt
import EmpruntService from "./emprunt.service.js";

// Controller permettant de gérer les requêtes liées aux emprunts
class EmpruntController {
  
  // Créer un emprunt
  static creation = async (req, res) => {
    try {
      const resultat = await EmpruntService.creationEmprunt(req.body);
      res.status(201).json(resultat);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l'emprunt",
        error: error.message
      });
    }
  };

  // Récupérer tous les emprunts
  static findAll = async (req, res) => {
    try {
      const resultat = await EmpruntService.toutEmprunt();
      res.status(200).json(resultat);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des emprunts",
        error: error.message
      });
    }
  };

  // Récupérer un emprunt par son ID
  static findById = async (req, res) => {
  try {
    const resultat = await EmpruntService.recuperationId(req.params.id);

    // Vérifier si l'emprunt existe
    if (!resultat) {
      return res.status(404).json({
        message: "Emprunt introuvable"
      });
    }

    res.status(200).json(resultat);

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'emprunt",
      error: error.message
    });
  }
};

  // Retourner un livre
  static retour = async (req, res) => {
  try {
    const resultat = await EmpruntService.retourLivre(req.params.id);

    // Vérifier si l'emprunt existe
    if (!resultat) {
      return res.status(404).json({
        message: "Emprunt introuvable"
      });
    }

    res.status(200).json({
      message: "Livre retourné avec succès",
      resultat
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du retour du livre",
      error: error.message
    });
  }
};

  // Supprimer un emprunt
  static delete = async (req, res) => {
    try {
      const resultat = await EmpruntService.delete(req.params.id);

      res.status(200).json({
        message: "Emprunt supprimé avec succès",
        resultat
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'emprunt",
        error: error.message
      });
    }
  };
}

export default EmpruntController;