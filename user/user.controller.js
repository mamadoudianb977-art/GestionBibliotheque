import UserService from "./user.service.js";

// Controller permettant de gérer les requêtes HTTP des utilisateurs
class UserController {

  // Créer un utilisateur
  async create(req, res) {
    try {
      const resultat = await UserService.create(req.body);

      res.status(201).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur",
        erreur: error.message
      });
    }
  }


  // Connexion d'un utilisateur
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Vérification des champs obligatoires
      if (!email || !password) {
        return res.status(400).json({
          message: "Email et mot de passe obligatoires"
        });
      }

      // Vérification du compte et du mot de passe
      const resultat = await UserService.login(email, password);

      res.status(200).json(resultat);

    } catch (error) {
      res.status(401).json({
        message: error.message
      });
    }
  }


  // Récupérer tous les utilisateurs
  async findAll(req, res) {
    try {
      const resultat = await UserService.findAll();

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des utilisateurs",
        erreur: error.message
      });
    }
  }


  // Récupérer un utilisateur par son ID
  async findById(req, res) {
    try {
      const resultat = await UserService.findById(req.params.id);

      if (!resultat) {
        return res.status(404).json({
          message: "Utilisateur introuvable"
        });
      }

      res.status(200).json(resultat);

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'utilisateur",
        erreur: error.message
      });
    }
  }


  // Modifier un utilisateur
  async update(req, res) {
    try {
      const resultat = await UserService.update(
        req.params.id,
        req.body
      );

      if (!resultat) {
        return res.status(404).json({
          message: "Utilisateur introuvable"
        });
      }

      res.status(200).json({
        message: "Utilisateur modifié avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la modification de l'utilisateur",
        erreur: error.message
      });
    }
  }


  // Supprimer un utilisateur
  async delete(req, res) {
    try {
      const resultat = await UserService.delete(req.params.id);

      if (!resultat) {
        return res.status(404).json({
          message: "Utilisateur introuvable"
        });
      }

      res.status(200).json({
        message: "Utilisateur supprimé avec succès",
        resultat
      });

    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'utilisateur",
        erreur: error.message
      });
    }
  }
}


// Exportation du controller
export default new UserController();