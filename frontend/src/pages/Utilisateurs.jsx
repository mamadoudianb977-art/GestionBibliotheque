import { useEffect, useState } from "react";
import api from "../services/api";

function Utilisateurs() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [recherche, setRecherche] = useState("");
    const [edition, setEdition] = useState(null);
    const [message, setMessage] = useState("");
    const [chargement, setChargement] = useState(true);

    const utilisateurConnecte = JSON.parse(
        localStorage.getItem("utilisateur") || "{}"
    );

    const estAdmin = utilisateurConnecte.role === "admin";

    const formulaireInitial = {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        role: "membre"
    };

    const [formulaire, setFormulaire] = useState(formulaireInitial);

    const chargerUtilisateurs = async () => {
        try {
            const reponse = await api.get("/users");
            const data = reponse.data;

            setUtilisateurs(
                Array.isArray(data)
                    ? data
                    : data.resultat || data.utilisateurs || []
            );
        } catch (erreur) {
            setMessage(
                erreur.response?.data?.message ||
                "Impossible de charger les utilisateurs."
            );
        } finally {
            setChargement(false);
        }
    };

    useEffect(() => {
        if (estAdmin) {
            chargerUtilisateurs();
        } else {
            setChargement(false);
        }
    }, []);

    const changerChamp = (e) => {
        setFormulaire({
            ...formulaire,
            [e.target.name]: e.target.value
        });
    };

    const reinitialiser = () => {
        setFormulaire(formulaireInitial);
        setEdition(null);
    };

    const enregistrerUtilisateur = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            if (edition) {
                const donnees = {
                    nom: formulaire.nom,
                    prenom: formulaire.prenom,
                    email: formulaire.email,
                    role: formulaire.role
                };

                if (formulaire.password.trim()) {
                    donnees.password = formulaire.password;
                }

                await api.put(`/users/${edition}`, donnees);

                setMessage("Utilisateur modifié avec succès !");
            } else {
                await api.post("/users", formulaire);

                setMessage("Utilisateur créé avec succès !");
            }

            reinitialiser();
            chargerUtilisateurs();
        } catch (erreur) {
            setMessage(
                erreur.response?.data?.message ||
                "Une erreur est survenue."
            );
        }
    };

    const modifierUtilisateur = (utilisateur) => {
        setEdition(utilisateur._id);

        setFormulaire({
            nom: utilisateur.nom || "",
            prenom: utilisateur.prenom || "",
            email: utilisateur.email || "",
            password: "",
            role: utilisateur.role || "membre"
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const supprimerUtilisateur = async (id) => {
        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer cet utilisateur ?"
        );

        if (!confirmation) return;

        try {
            await api.delete(`/users/${id}`);

            setMessage("Utilisateur supprimé avec succès !");
            chargerUtilisateurs();
        } catch (erreur) {
            setMessage(
                erreur.response?.data?.message ||
                "Impossible de supprimer cet utilisateur."
            );
        }
    };

    const utilisateursFiltres = utilisateurs.filter((u) =>
        `${u.nom} ${u.prenom} ${u.email} ${u.role}`
            .toLowerCase()
            .includes(recherche.toLowerCase())
    );

    if (!estAdmin) {
        return (
            <div className="utilisateurs-page">
                <div className="utilisateurs-interdit">
                    <h2>Accès refusé</h2>
                    <p>
                        Seul un administrateur peut gérer les utilisateurs.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="utilisateurs-page">

            <div className="utilisateurs-header">
                <div>
                    <h1>Gestion des utilisateurs</h1>
                    <p>Créer, modifier et gérer les comptes utilisateurs.</p>
                </div>

                <div className="utilisateurs-total">
                    {utilisateurs.length} utilisateurs
                </div>
            </div>

            {message && (
                <div className="utilisateur-message">
                    {message}
                </div>
            )}

            <div className="utilisateur-form-card">
                <h2>
                    {edition ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
                </h2>

                <form onSubmit={enregistrerUtilisateur}>
                    <div className="utilisateur-form-grid">

                        <div className="utilisateur-input-group">
                            <label>Nom</label>
                            <input
                                type="text"
                                name="nom"
                                value={formulaire.nom}
                                onChange={changerChamp}
                                placeholder="Nom"
                                required
                            />
                        </div>

                        <div className="utilisateur-input-group">
                            <label>Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formulaire.prenom}
                                onChange={changerChamp}
                                placeholder="Prénom"
                                required
                            />
                        </div>

                        <div className="utilisateur-input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formulaire.email}
                                onChange={changerChamp}
                                placeholder="Adresse email"
                                required
                            />
                        </div>

                        <div className="utilisateur-input-group">
                            <label>
                                {edition
                                    ? "Nouveau mot de passe (facultatif)"
                                    : "Mot de passe"}
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formulaire.password}
                                onChange={changerChamp}
                                placeholder="Mot de passe"
                                required={!edition}
                            />
                        </div>

                        <div className="utilisateur-input-group">
                            <label>Rôle</label>

                            <select
                                name="role"
                                value={formulaire.role}
                                onChange={changerChamp}
                            >
                                <option value="membre">Membre</option>
                                <option value="admin">Administrateur</option>
                            </select>
                        </div>

                    </div>

                    <div className="utilisateur-form-actions">
                        <button type="submit" className="btn-utilisateur-primary">
                            {edition ? "Enregistrer les modifications" : "Créer l'utilisateur"}
                        </button>

                        {edition && (
                            <button
                                type="button"
                                className="btn-utilisateur-cancel"
                                onClick={reinitialiser}
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="utilisateur-list-card">

                <div className="utilisateur-list-header">
                    <h2>Liste des utilisateurs</h2>

                    <input
                        type="text"
                        className="utilisateur-search"
                        placeholder="Rechercher un utilisateur..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />
                </div>

                {chargement ? (
                    <p>Chargement des utilisateurs...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="utilisateur-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Rôle</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {utilisateursFiltres.map((u) => (
                                    <tr key={u._id}>
                                        <td>{u.nom}</td>
                                        <td>{u.prenom}</td>
                                        <td>{u.email}</td>

                                        <td>
                                            <span className={
                                                u.role === "admin"
                                                    ? "badge-admin"
                                                    : "badge-membre"
                                            }>
                                                {u.role}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="utilisateur-actions">
                                                <button
                                                    className="btn-utilisateur-edit"
                                                    onClick={() => modifierUtilisateur(u)}
                                                >
                                                    Modifier
                                                </button>

                                                <button
                                                    className="btn-utilisateur-delete"
                                                    onClick={() => supprimerUtilisateur(u._id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {utilisateursFiltres.length === 0 && (
                                    <tr>
                                        <td colSpan="5">
                                            Aucun utilisateur trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Utilisateurs;