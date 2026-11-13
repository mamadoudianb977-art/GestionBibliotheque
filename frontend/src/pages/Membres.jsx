import { useEffect, useState } from "react";
import api from "../services/api";

function Membres() {
    const [membres, setMembres] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [recherche, setRecherche] = useState("");

    const [edition, setEdition] = useState(false);
    const [membreId, setMembreId] = useState(null);

    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    const [formulaire, setFormulaire] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: ""
    });

    // Charger les membres
    const chargerMembres = async () => {
        try {
            setChargement(true);

            const reponse = await api.get("/membres");
            const data = reponse.data;

            const liste =
                Array.isArray(data) ? data :
                Array.isArray(data.resultat) ? data.resultat :
                Array.isArray(data.membres) ? data.membres :
                Array.isArray(data.data) ? data.data : [];

            setMembres(liste);

        } catch (error) {
            console.error(error);
            setErreur("Impossible de récupérer les membres.");
        } finally {
            setChargement(false);
        }
    };

    useEffect(() => {
        chargerMembres();
    }, []);

    // Modifier les champs
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
            email: "",
            telephone: ""
        });

        setEdition(false);
        setMembreId(null);
    };

    // Ajouter ou modifier
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setErreur("");

        try {
            if (edition) {
                await api.put(`/membres/${membreId}`, formulaire);

                setMessage("Membre modifié avec succès !");
            } else {
                await api.post("/membres", formulaire);

                setMessage("Membre ajouté avec succès !");
            }

            viderFormulaire();
            await chargerMembres();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                error.response?.data?.erreur ||
                "Une erreur est survenue."
            );
        }
    };

    // Préparer la modification
    const modifierMembre = (membre) => {
        setFormulaire({
            nom: membre.nom || "",
            prenom: membre.prenom || "",
            email: membre.email || "",
            telephone: membre.telephone || ""
        });

        setMembreId(membre._id);
        setEdition(true);

        setMessage("");
        setErreur("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Supprimer un membre
    const supprimerMembre = async (id) => {
        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer ce membre ?"
        );

        if (!confirmation) return;

        setMessage("");
        setErreur("");

        try {
            await api.delete(`/membres/${id}`);

            setMessage("Membre supprimé avec succès !");

            await chargerMembres();

        } catch (error) {
            console.error(error);

            setErreur(
                error.response?.data?.message ||
                error.response?.data?.erreur ||
                "Impossible de supprimer ce membre."
            );
        }
    };

    // Recherche
    const membresFiltres = membres.filter((membre) => {
        const texte = recherche.toLowerCase();

        return (
            membre.nom?.toLowerCase().includes(texte) ||
            membre.prenom?.toLowerCase().includes(texte) ||
            membre.email?.toLowerCase().includes(texte) ||
            membre.telephone?.toLowerCase().includes(texte)
        );
    });

    return (
        <div className="membres-page">

            {/* En-tête */}
            <div className="membres-header">

                <div>
                    <h1>Gestion des membres</h1>
                    <p>Gérez les membres de votre bibliothèque.</p>
                </div>

                <div className="membres-total">
                    <span>👥</span>

                    <div>
                        <h3>{membres.length}</h3>
                        <p>Total des membres</p>
                    </div>
                </div>

            </div>

            {/* Messages */}
            {message && (
                <div className="membre-message succes">
                    {message}
                </div>
            )}

            {erreur && (
                <div className="membre-message erreur">
                    {erreur}
                </div>
            )}

            {/* Formulaire */}
            <div className="membre-form-card">

                <h2>
                    {edition ? "Modifier un membre" : "Ajouter un membre"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="membre-form-grid">

                        <div className="membre-input-group">
                            <label>Nom</label>

                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom du membre"
                                value={formulaire.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="membre-input-group">
                            <label>Prénom</label>

                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom du membre"
                                value={formulaire.prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="membre-input-group">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="exemple@gmail.com"
                                value={formulaire.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="membre-input-group">
                            <label>Téléphone</label>

                            <input
                                type="tel"
                                name="telephone"
                                placeholder="Numéro de téléphone"
                                value={formulaire.telephone}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="membre-form-buttons">

                        <button
                            type="submit"
                            className="btn-membre-primary"
                        >
                            {edition
                                ? "Enregistrer les modifications"
                                : "Ajouter le membre"}
                        </button>

                        {edition && (
                            <button
                                type="button"
                                className="btn-membre-cancel"
                                onClick={viderFormulaire}
                            >
                                Annuler
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* Liste des membres */}
            <div className="membre-list-card">

                <div className="membre-list-header">

                    <div>
                        <h2>Liste des membres</h2>
                        <p>Retrouvez tous les membres enregistrés.</p>
                    </div>

                    <input
                        type="search"
                        className="membre-search"
                        placeholder="Rechercher un membre..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />

                </div>

                {chargement ? (

                    <p className="membre-loading">
                        Chargement des membres...
                    </p>

                ) : membresFiltres.length === 0 ? (

                    <p className="membre-empty">
                        Aucun membre trouvé.
                    </p>

                ) : (

                    <div className="membre-table-container">

                        <table className="membre-table">

                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {membresFiltres.map((membre, index) => (

                                    <tr key={membre._id}>

                                        <td>{index + 1}</td>

                                        <td>{membre.nom}</td>

                                        <td>{membre.prenom}</td>

                                        <td>{membre.email}</td>

                                        <td>
                                            {membre.telephone || "Non renseigné"}
                                        </td>

                                        <td>
                                            <div className="membre-actions">

                                                <button
                                                    className="btn-membre-edit"
                                                    onClick={() => modifierMembre(membre)}
                                                >
                                                    ✏️ Modifier
                                                </button>

                                                <button
                                                    className="btn-membre-delete"
                                                    onClick={() => supprimerMembre(membre._id)}
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

export default Membres;