import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const utilisateur = JSON.parse(
        localStorage.getItem("utilisateur") || "null"
    );

    const [statistiques, setStatistiques] = useState({
        livres: null,
        auteurs: null,
        membres: null,
        emprunts: null
    });

    const [chargement, setChargement] = useState(true);

    const obtenirNombre = (data) => {
        if (Array.isArray(data)) {
            return data.length;
        }

        if (data && typeof data === "object") {
            const cles = [
                "livres", "auteurs", "membres",
                "emprunts", "data", "resultat",
                "resultats", "results", "items"
            ];

            for (const cle of cles) {
                if (Array.isArray(data[cle])) {
                    return data[cle].length;
                }
            }

            if (typeof data.total === "number") return data.total;
            if (typeof data.count === "number") return data.count;
        }

        return null;
    };

    useEffect(() => {
        const chargerStatistiques = async () => {
            try {
                const [livres, auteurs, membres, emprunts] =
                    await Promise.allSettled([
                        api.get("/livres"),
                        api.get("/auteurs"),
                        api.get("/membres"),
                        api.get("/emprunts")
                    ]);

                setStatistiques({
                    livres: livres.status === "fulfilled"
                        ? obtenirNombre(livres.value.data) : null,

                    auteurs: auteurs.status === "fulfilled"
                        ? obtenirNombre(auteurs.value.data) : null,

                    membres: membres.status === "fulfilled"
                        ? obtenirNombre(membres.value.data) : null,

                    emprunts: emprunts.status === "fulfilled"
                        ? obtenirNombre(emprunts.value.data) : null
                });
            } catch (error) {
                console.error("Erreur statistiques :", error);
            } finally {
                setChargement(false);
            }
        };

        chargerStatistiques();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");
        navigate("/");
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2>📚 Bibliothèque</h2>

                <ul>
                    <li onClick={() => navigate("/dashboard")}>🏠 Tableau de bord</li>
                    <li onClick={() => navigate("/livres")}>📚 Livres</li>
                    <li onClick={() => navigate("/auteurs")}>✍️ Auteurs</li>
                    <li onClick={() => navigate("/membres")}>👥 Membres</li>
                    <li onClick={() => navigate("/emprunts")}>📖 Emprunts</li>
                    <li onClick={() => navigate("/utilisateurs")}>⚙️ Utilisateurs</li>
                </ul>

                <button onClick={handleLogout}>Déconnexion</button>
            </aside>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Tableau de bord</h1>
                        <p>Bienvenue dans votre espace de gestion.</p>
                    </div>

                    <div className="user-info">
                        👤 {utilisateur?.prenom || "Utilisateur"}
                    </div>
                </header>

                <h3>Vue générale</h3>

                <div className="stats-container">
                    <div className="stat-card">
                        <h3>📚</h3>
                        <p>Total des livres</p>
                        <h2>{chargement ? "..." : statistiques.livres ?? "—"}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>👥</h3>
                        <p>Total des membres</p>
                        <h2>{chargement ? "..." : statistiques.membres ?? "—"}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>✍️</h3>
                        <p>Total des auteurs</p>
                        <h2>{chargement ? "..." : statistiques.auteurs ?? "—"}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>📖</h3>
                        <p>Total des emprunts</p>
                        <h2>{chargement ? "..." : statistiques.emprunts ?? "—"}</h2>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;