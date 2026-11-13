import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Livres() {
    const navigate = useNavigate();

    const [livres, setLivres] = useState([]);
    const [auteurs, setAuteurs] = useState([]);

    const [recherche, setRecherche] = useState("");
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);

    const [titre, setTitre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anneePublication, setAnneePublication] = useState("");
    const [auteur, setAuteur] = useState("");

    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");
    const [message, setMessage] = useState("");

    // Récupérer une liste depuis l'API
    const extraireListe = (data, cle) => {
        if (Array.isArray(data)) return data;

        if (Array.isArray(data?.[cle])) return data[cle];
        if (Array.isArray(data?.data)) return data.data;
        if (Array.isArray(data?.resultats)) return data.resultats;

        return [];
    };

    // Charger les livres et les auteurs
    const chargerDonnees = async () => {
        try {
            const [responseLivres, responseAuteurs] =
                await Promise.all([
                    api.get("/livres"),
                    api.get("/auteurs")
                ]);

            setLivres(
                extraireListe(responseLivres.data, "livres")
            );

            setAuteurs(
                extraireListe(responseAuteurs.data, "auteurs")
            );

        } catch (error) {
            console.error(error);
            setErreur("Impossible de charger les données.");
        } finally {
            setChargement(false);
        }
    };

    useEffect(() => {
        chargerDonnees();
    }, []);

    // Ajouter un livre
    const ajouterLivre = async (e) => {
        e.preventDefault();

        setErreur("");
        setMessage("");

        try {
            const nouveauLivre = {
                titre,
                isbn,
                anneePublication: Number(anneePublication),
                auteur
            };

            await api.post("/livres", nouveauLivre);

            setMessage("Livre ajouté avec succès !");

            // Vider le formulaire
            setTitre("");
            setIsbn("");
            setAnneePublication("");
            setAuteur("");

            setAfficherFormulaire(false);

            // Actualiser la liste
            await chargerDonnees();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                "Erreur lors de l'ajout du livre."
            );
        }
    };

    // Recherche
    const livresFiltres = livres.filter((livre) =>
        `${livre.titre || ""} ${livre.isbn || ""}`
            .toLowerCase()
            .includes(recherche.toLowerCase())
    );

    return (
        <div className="livres-page">

            <header className="livres-header">

                <div>
                    <h1>📚 Gestion des livres</h1>
                    <p>Gérez les livres de votre bibliothèque.</p>
                </div>

                <button
                    className="btn-retour"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Tableau de bord
                </button>

            </header>

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {erreur && (
                <div className="alert alert-danger">
                    {erreur}
                </div>
            )}

            <div className="livres-card">

                <div className="livres-actions">

                    <h3>Liste des livres ({livres.length})</h3>

                    <button
                        className="btn btn-primary"
                        onClick={() => setAfficherFormulaire(!afficherFormulaire)}
                    >
                        {afficherFormulaire ? "Fermer" : "+ Ajouter un livre"}
                    </button>

                </div>

                {afficherFormulaire && (

                    <form onSubmit={ajouterLivre} className="mb-4">

                        <h4 className="mb-3">Nouveau livre</h4>

                        <div className="mb-3">
                            <label className="form-label">
                                Titre du livre
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                minLength="2"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                ISBN
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Année de publication
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                value={anneePublication}
                                onChange={(e) => setAnneePublication(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Auteur
                            </label>

                            <select
                                className="form-select"
                                value={auteur}
                                onChange={(e) => setAuteur(e.target.value)}
                                required
                            >
                                <option value="">
                                    Choisir un auteur
                                </option>

                                {auteurs.map((item) => (
                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.nom} {item.prenom || ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Enregistrer le livre
                        </button>

                    </form>
                )}

                <div className="mb-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher un livre..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />

                </div>

                {chargement ? (

                    <p>Chargement des livres...</p>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-striped table-hover">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titre</th>
                                    <th>ISBN</th>
                                    <th>Année</th>
                                    <th>Auteur</th>
                                </tr>
                            </thead>

                            <tbody>

                                {livresFiltres.length > 0 ? (

                                    livresFiltres.map((livre, index) => (

                                        <tr key={livre._id || index}>
                                            <td>{index + 1}</td>
                                            <td>{livre.titre}</td>
                                            <td>{livre.isbn}</td>
                                            <td>{livre.anneePublication}</td>

                                            <td>
                                                {typeof livre.auteur === "object"
                                                    ? `${livre.auteur?.nom || ""} ${livre.auteur?.prenom || ""}`.trim()
                                                    : livre.auteur}
                                            </td>
                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            Aucun livre trouvé.
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

export default Livres;