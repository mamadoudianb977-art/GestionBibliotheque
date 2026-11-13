// Middleware permettant de valider les données reçues
// grâce aux schémas Yup

const validationMiddleware = (schema) => {

  return async (req, res, next) => {

    try {

      // Validation des données reçues dans req.body
      // abortEarly: false permet de récupérer toutes les erreurs
      await schema.validate(req.body, {
        abortEarly: false
      });

      // Si la validation réussit,
      // on passe au controller suivant
      next();

    } catch (error) {

      // Si la validation échoue,
      // on retourne une erreur 400
      res.status(400).json({
        message: "Erreur de validation",
        erreurs: error.errors
      });
    }
  };
};

// Exportation du middleware
export default validationMiddleware;