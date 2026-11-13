import { useEffect, useState } from "react";
import api from "../services/api";

function obtenirListe(data, nom) {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.resultat)) return data.resultat;
    if (Array.isArray(data?.[nom])) return data[nom];
    if (Array.isArray(data?.data)) return data.data;

    return [];
}

function dateLocale(date = new Date()) {
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");

    return `${annee}-${mois}-${jour}`;
}

function afficherDate(date) {
    if (!date) return "Non renseignée";

    const valeur = new Date(date);

    if (Number.isNaN(valeur.getTime())) return "Date invalide";

    return valeur.toLocaleDateString("fr-FR");
}

function Emprunts() {
    const [emprunts, setEmprunts] = useState([]);
    const [livres, setLivres] = useState([]);
    const [membres, setMembres] = useState([]);

    const [chargement, setChargement] = useState(true);
    const [recherche, setRecherche] = useState("");

    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    const [formulaire, setFormulaire] = useState({
        livre: "",
        membre: "",
        dateEmprunt: dateLocale(),
        dateRetourPrevue: ""
    });

    // Charger les emprunts, les livres et les membres
    const chargerDonnees = async () => {
        try {
            setChargement(true);

            const [resEmprunts, resLivres, resMembres] =
                await Promise.all([
                    api.get("/emprunts"),
                    api.get("/livres"),
                    api.get("/membres")
                ]);

            setEmprunts(
                obtenirListe(resEmprunts.data, "emprunts")
            );

            setLivres(
                obtenirListe(resLivres.data, "livres")
            );

            setMembres(
                obtenirListe(resMembres.data, "membres")
            );

        } catch (error) {
            console.error("Erreur chargement :", error);

            setErreur(
                error.response?.data?.message ||
                "Impossible de charger les données."
            );
        } finally {
            setChargement(false);
        }
    };

    useEffect(() => {
        chargerDonnees();
    }, []);

    // Modifier le formulaire
    const handleChange = (e) => {
        setFormulaire({
            ...formulaire,
            [e.target.name]: e.target.value
        });
    };

    // Réinitialiser le formulaire
    const viderFormulaire = () => {
        setFormulaire({
            livre: "",
            membre: "",
            dateEmprunt: dateLocale(),
            dateRetourPrevue: ""
        });
    };

    // Enregistrer un emprunt
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setErreur("");

        try {
            const donnees = {
                livre: formulaire.livre,
                membre: formulaire.membre,
                dateEmprunt: new Date(
                    `${formulaire.dateEmprunt}T12:00:00`
                ).toISOString(),
                dateRetourPrevue: new Date(
                    `${formulaire.dateRetourPrevue}T12:00:00`
                ).toISOString(),
                dateRetour: null,
                statut: "en cours"
            };

            await api.post("/emprunts", donnees);

            setMessage("Emprunt enregistré avec succès !");

            viderFormulaire();

            await chargerDonnees();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                error.response?.data?.erreur ||
                "Impossible d'enregistrer cet emprunt."
            );
        }
    };

    // Enregistrer le retour d'un livre
    const retournerLivre = async (id) => {
        const confirmation = window.confirm(
            "Confirmez-vous le retour de ce livre ?"
        );

        if (!confirmation) return;

        setMessage("");
        setErreur("");

        try {
            await api.put(`/emprunts/${id}/retour`);

            setMessage("Retour du livre enregistré avec succès !");

            await chargerDonnees();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                "Impossible d'enregistrer le retour."
            );
        }
    };

    // Supprimer un emprunt
    const supprimerEmprunt = async (id) => {
        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer cet emprunt ?"
        );

        if (!confirmation) return;

        setMessage("");
        setErreur("");

        try {
            await api.delete(`/emprunts/${id}`);

            setMessage("Emprunt supprimé avec succès !");

            await chargerDonnees();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                "Impossible de supprimer cet emprunt."
            );
        }
    };

    // Informations sur un livre
    const nomLivre = (livre) => {
        if (!livre) return "Livre inconnu";

        if (typeof livre === "string") {
            const trouve = livres.find((l) => l._id === livre);

            return trouve?.titre || trouve?.nom || "Livre inconnu";
        }

        return livre.titre || livre.nom || "Livre inconnu";
    };

    // Informations sur un membre
    const nomMembre = (membre) => {
        if (!membre) return "Membre inconnu";

        if (typeof membre === "string") {
            const trouve = membres.find((m) => m._id === membre);

            return trouve
                ? `${trouve.prenom || ""} ${trouve.nom || ""}`.trim()
                : "Membre inconnu";
        }

        return `${membre.prenom || ""} ${membre.nom || ""}`.trim()
            || membre.email
            || "Membre inconnu";
    };

    // Recherche
    const empruntsFiltres = emprunts.filter((emprunt) => {
        const texte = recherche.toLowerCase();

        return (
            nomLivre(emprunt.livre).toLowerCase().includes(texte) ||
            nomMembre(emprunt.membre).toLowerCase().includes(texte) ||
            emprunt.statut?.toLowerCase().includes(texte)
        );
    });

    // Statistiques
    const empruntsEnCours = emprunts.filter(
        (e) => e.statut === "en cours"
    ).length;

    const empruntsRetournes = emprunts.filter(
        (e) => e.statut === "retourne"
    ).length;

    return (
        <div className="emprunts-page">

            {/* En-tête */}
            <div className="emprunts-header">

                <div>
                    <h1>Gestion des emprunts</h1>
                    <p>Suivez les emprunts et les retours des livres.</p>
                </div>

                <div className="emprunts-total">
                    <span>📖</span>

                    <div>
                        <h3>{emprunts.length}</h3>
                        <p>Total des emprunts</p>
                    </div>
                </div>

            </div>

            {/* Statistiques */}
            <div className="emprunts-stats">

                <div className="emprunt-stat-card">
                    <span>📚</span>
                    <div>
                        <p>En cours</p>
                        <h2>{empruntsEnCours}</h2>
                    </div>
                </div>

                <div className="emprunt-stat-card">
                    <span>✅</span>
                    <div>
                        <p>Retournés</p>
                        <h2>{empruntsRetournes}</h2>
                    </div>
                </div>

                <div className="emprunt-stat-card">
                    <span>👥</span>
                    <div>
                        <p>Membres</p>
                        <h2>{membres.length}</h2>
                    </div>
                </div>

            </div>

            {/* Messages */}
            {message && (
                <div className="emprunt-message succes">
                    {message}
                </div>
            )}

            {erreur && (
                <div className="emprunt-message erreur">
                    {erreur}
                </div>
            )}

            {/* Formulaire */}
            <div className="emprunt-form-card">

                <h2>Enregistrer un nouvel emprunt</h2>

                <form onSubmit={handleSubmit}>

                    <div className="emprunt-form-grid">

                        <div className="emprunt-input-group">
                            <label>Choisir un livre</label>

                            <select
                                name="livre"
                                value={formulaire.livre}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un livre</option>

                                {livres.map((livre) => (
                                    <option
                                        key={livre._id}
                                        value={livre._id}
                                    >
                                        {livre.titre || livre.nom || "Livre sans titre"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="emprunt-input-group">
                            <label>Choisir un membre</label>

                            <select
                                name="membre"
                                value={formulaire.membre}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un membre</option>

                                {membres.map((membre) => (
                                    <option
                                        key={membre._id}
                                        value={membre._id}
                                    >
                                        {membre.prenom} {membre.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="emprunt-input-group">
                            <label>Date d'emprunt</label>

                            <input
                                type="date"
                                name="dateEmprunt"
                                value={formulaire.dateEmprunt}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="emprunt-input-group">
                            <label>Date de retour prévue</label>

                            <input
                                type="date"
                                name="dateRetourPrevue"
                                value={formulaire.dateRetourPrevue}
                                onChange={handleChange}
                                min={formulaire.dateEmprunt}
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn-emprunt-primary"
                        disabled={!livres.length || !membres.length}
                    >
                        + Enregistrer l'emprunt
                    </button>

                    {(!livres.length || !membres.length) && (
                        <p className="emprunt-warning">
                            Ajoutez d'abord au moins un livre et un membre.
                        </p>
                    )}

                </form>

            </div>

            {/* Liste */}
            <div className="emprunt-list-card">

                <div className="emprunt-list-header">

                    <div>
                        <h2>Liste des emprunts</h2>
                        <p>Consultez les emprunts enregistrés.</p>
                    </div>

                    <input
                        type="search"
                        className="emprunt-search"
                        placeholder="Rechercher un emprunt..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />

                </div>

                {chargement ? (

                    <p className="emprunt-loading">
                        Chargement des emprunts...
                    </p>

                ) : empruntsFiltres.length === 0 ? (

                    <p className="emprunt-empty">
                        Aucun emprunt trouvé.
                    </p>

                ) : (

                    <div className="emprunt-table-container">

                        <table className="emprunt-table">

                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Livre</th>
                                    <th>Membre</th>
                                    <th>Date d'emprunt</th>
                                    <th>Retour prévu</th>
                                    <th>Retour réel</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {empruntsFiltres.map((emprunt, index) => (

                                    <tr key={emprunt._id}>

                                        <td>{index + 1}</td>

                                        <td>{nomLivre(emprunt.livre)}</td>

                                        <td>{nomMembre(emprunt.membre)}</td>

                                        <td>{afficherDate(emprunt.dateEmprunt)}</td>

                                        <td>{afficherDate(emprunt.dateRetourPrevue)}</td>

                                        <td>{afficherDate(emprunt.dateRetour)}</td>

                                        <td>
                                            <span className={
                                                emprunt.statut === "retourne"
                                                    ? "badge-retourne"
                                                    : "badge-en-cours"
                                            }>
                                                {emprunt.statut === "retourne"
                                                    ? "Retourné"
                                                    : "En cours"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="emprunt-actions">

                                                {emprunt.statut !== "retourne" && (
                                                    <button
                                                        className="btn-emprunt-retour"
                                                        onClick={() => retournerLivre(emprunt._id)}
                                                    >
                                                        ✓ Retour
                                                    </button>
                                                )}

                                                <button
                                                    className="btn-emprunt-delete"
                                                    onClick={() => supprimerEmprunt(emprunt._id)}
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

export default Emprunts;