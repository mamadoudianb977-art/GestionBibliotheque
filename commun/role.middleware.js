// Middleware permettant de vérifier le rôle de l'utilisateur
const roleMiddleware = (roleAutorise) => {

  // Retourne un middleware Express
  return (req, res, next) => {

    // Vérifier que l'utilisateur est bien identifié
    // par authMiddleware
    if (!req.user) {
      return res.status(401).json({
        message: "Utilisateur non authentifié"
      });
    }

    // Vérifier si le rôle de l'utilisateur
    // correspond au rôle demandé
    if (req.user.role !== roleAutorise) {
      return res.status(403).json({
        message: "Accès interdit : vous n'avez pas les permissions nécessaires"
      });
    }

    // Si le rôle est correct,
    // on autorise la requête à continuer
    next();
  };
};

// Exportation du middleware
export default roleMiddleware;
