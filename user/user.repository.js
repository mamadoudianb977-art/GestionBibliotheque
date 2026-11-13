import User from "./model/user.model.js";

// Repository permettant d'effectuer les opérations sur les utilisateurs
class UserRepository {

  // Créer un utilisateur
  async create(data) {
    const user = await User.create(data);

    // Ne jamais retourner le mot de passe dans la réponse
    user.password = undefined;

    return user;
  }

  // Récupérer tous les utilisateurs
  async findAll() {
    return await User.find().select("-password");
  }

  // Récupérer un utilisateur par son ID
  async findById(id) {
    return await User.findById(id).select("-password");
  }

  // Rechercher un utilisateur par son email
  // Le password est conservé ici pour le login
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  // Modifier un utilisateur
  async update(id, data) {
    return await User.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");
  }

  // Supprimer un utilisateur
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

// Création d'une instance du repository
export default new UserRepository();