import LivreService from "./livre.service.js";

// Controller permettant de gérer les requêtes liées aux livres
class LivreController {

  // CRÉER UN LIVRE
  static creation = async (req, res) => {
    try {
      const resultat = await LivreService.creationLivre(req.body);

      res.status(201).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création du livre",
        error: error.message
      });
    }
  };

  // RÉCUPÉRER TOUS LES LIVRES
  static findAll = async (req, res) => {
    try {
      const resultat = await LivreService.toutLivre();

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des livres",
        error: error.message
      });
    }
  };

  // RÉCUPÉRER UN LIVRE PAR SON ID
  static findById = async (req, res) => {
    try {
      const resultat = await LivreService.recuperationId(req.params.id);

      if (!resultat) {
        return res.status(404).json({
          message: "Livre introuvable"
        });
      }

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du livre",
        error: error.message
      });
    }
  };

  // MODIFIER UN LIVRE
  static update = async (req, res) => {
    try {
      const resultat = await LivreService.update(
        req.params.id,
        req.body
      );

      if (!resultat) {
        return res.status(404).json({
          message: "Livre introuvable"
        });
      }

      res.status(200).json({
        message: "Livre modifié avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la modification du livre",
        error: error.message
      });
    }
  };

  // SUPPRIMER UN LIVRE
  static delete = async (req, res) => {
    try {
      const resultat = await LivreService.delete(req.params.id);

      if (!resultat) {
        return res.status(404).json({
          message: "Livre introuvable"
        });
      }

      res.status(200).json({
        message: "Livre supprimé avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du livre",
        error: error.message
      });
    }
  };
}


// Exportation du controller
export default LivreController;
