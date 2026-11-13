import { useEffect, useState } from "react";
import api from "../services/api";

function Auteurs() {
    const [auteurs, setAuteurs] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [recherche, setRecherche] = useState("");
    const [edition, setEdition] = useState(false);
    const [auteurId, setAuteurId] = useState(null);

    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    const [formulaire, setFormulaire] = useState({
        nom: "",
        prenom: "",
        nationalite: ""
    });

    // Récupérer les auteurs
    const chargerAuteurs = async () => {
        try {
            setChargement(true);

            const reponse = await api.get("/auteurs");
            const data = reponse.data;

            const liste =
                Array.isArray(data) ? data :
                Array.isArray(data.resultat) ? data.resultat :
                Array.isArray(data.auteurs) ? data.auteurs :
                Array.isArray(data.data) ? data.data : [];

            setAuteurs(liste);

        } catch (error) {
            console.error(error);
            setErreur("Impossible de récupérer les auteurs.");
        } finally {
            setChargement(false);
        }
    };

    useEffect(() => {
        chargerAuteurs();
    }, []);

    // Modifier les champs du formulaire
    const handleChange = (e) => {
        setFormulaire({
            ...formulaire,
            [e.target.name]: e.target.value
        });
    };

    // Vider le formulaire
    const viderFormulaire = () => {
        setFormulaire({
            nom: "",
            prenom: "",
            nationalite: ""
        });

        setEdition(false);
        setAuteurId(null);
    };

    // Ajouter ou modifier un auteur
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setErreur("");

        try {
            if (edition) {
                await api.put(`/auteurs/${auteurId}`, formulaire);
                setMessage("Auteur modifié avec succès !");
            } else {
                await api.post("/auteurs", formulaire);
                setMessage("Auteur ajouté avec succès !");
            }

            viderFormulaire();
            await chargerAuteurs();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                "Une erreur est survenue lors de l'enregistrement."
            );
        }
    };

    // Préparer la modification
    const modifierAuteur = (auteur) => {
        setFormulaire({
            nom: auteur.nom || "",
            prenom: auteur.prenom || "",
            nationalite: auteur.nationalite || ""
        });

        setAuteurId(auteur._id);
        setEdition(true);

        setMessage("");
        setErreur("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Supprimer un auteur
    const supprimerAuteur = async (id) => {
        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer cet auteur ?"
        );

        if (!confirmation) return;

        setMessage("");
        setErreur("");

        try {
            await api.delete(`/auteurs/${id}`);

            setMessage("Auteur supprimé avec succès !");
            await chargerAuteurs();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                "Impossible de supprimer cet auteur."
            );
        }
    };

    // Recherche
    const auteursFiltres = auteurs.filter((auteur) => {
        const texte = recherche.toLowerCase();

        return (
            auteur.nom?.toLowerCase().includes(texte) ||
            auteur.prenom?.toLowerCase().includes(texte) ||
            auteur.nationalite?.toLowerCase().includes(texte)
        );
    });

    return (
        <div className="auteurs-page">

            <div className="auteurs-header">
                <div>
                    <h1>Gestion des auteurs</h1>
                    <p>Gérez les auteurs de votre bibliothèque.</p>
                </div>

                <div className="auteurs-total">
                    <span>✍️</span>
                    <div>
                        <h3>{auteurs.length}</h3>
                        <p>Total des auteurs</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            {message && (
                <div className="auteur-message succes">
                    {message}
                </div>
            )}

            {erreur && (
                <div className="auteur-message erreur">
                    {erreur}
                </div>
            )}

            {/* Formulaire */}
            <div className="auteur-form-card">

                <h2>
                    {edition ? "Modifier un auteur" : "Ajouter un auteur"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="auteur-form-grid">

                        <div className="auteur-input-group">
                            <label>Nom</label>
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom de l'auteur"
                                value={formulaire.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auteur-input-group">
                            <label>Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom de l'auteur"
                                value={formulaire.prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auteur-input-group">
                            <label>Nationalité</label>
                            <input
                                type="text"
                                name="nationalite"
                                placeholder="Nationalité"
                                value={formulaire.nationalite}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="auteur-form-buttons">

                        <button type="submit" className="btn-auteur-primary">
                            {edition ? "Enregistrer les modifications" : "Ajouter l'auteur"}
                        </button>

                        {edition && (
                            <button
                                type="button"
                                className="btn-auteur-cancel"
                                onClick={viderFormulaire}
                            >
                                Annuler
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* Liste des auteurs */}
            <div className="auteur-list-card">

                <div className="auteur-list-header">
                    <div>
                        <h2>Liste des auteurs</h2>
                        <p>Retrouvez tous les auteurs enregistrés.</p>
                    </div>

                    <input
                        type="search"
                        className="auteur-search"
                        placeholder="Rechercher un auteur..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />
                </div>

                {chargement ? (

                    <p className="auteur-loading">
                        Chargement des auteurs...
                    </p>

                ) : auteursFiltres.length === 0 ? (

                    <p className="auteur-empty">
                        Aucun auteur trouvé.
                    </p>

                ) : (

                    <div className="auteur-table-container">

                        <table className="auteur-table">

                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Nationalité</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {auteursFiltres.map((auteur, index) => (

                                    <tr key={auteur._id}>
                                        <td>{index + 1}</td>

                                        <td>{auteur.nom}</td>

                                        <td>{auteur.prenom}</td>

                                        <td>
                                            {auteur.nationalite || "Non renseignée"}
                                        </td>

                                        <td>
                                            <div className="auteur-actions">

                                                <button
                                                    className="btn-auteur-edit"
                                                    onClick={() => modifierAuteur(auteur)}
                                                >
                                                    ✏️ Modifier
                                                </button>

                                                <button
                                                    className="btn-auteur-delete"
                                                    onClick={() => supprimerAuteur(auteur._id)}
                                                >
                                                    🗑️ Supprimer
                                                </button>

                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Auteurs;