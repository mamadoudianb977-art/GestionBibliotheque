import jwt from "jsonwebtoken";

// Middleware qui vérifie le token JWT
const authMiddleware = (req, res, next) => {

  // Récupérer le header Authorization
  const authHeader = req.headers.authorization;

  // Vérifier si le token existe
  if (!authHeader) {
    return res.status(401).json({
      message: "Token d'authentification manquant"
    });
  }

  // Le format attendu est :
  // Authorization: Bearer TOKEN
  const parts = authHeader.split(" ");

  // Vérifier le format du header
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Format du token invalide"
    });
  }

  // Récupérer uniquement le token
  const token = parts[1];

  try {

    // Vérifier le token avec la clé secrète
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Stocker les informations du token
    // dans req.user pour les utiliser ensuite
    req.user = decoded;

    // Autoriser la requête à continuer
    next();

  } catch (error) {

    // Token invalide ou expiré
    return res.status(401).json({
      message: "Token invalide ou expiré"
    });
  }
};

export default authMiddleware;
