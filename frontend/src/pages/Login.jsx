import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreur, setErreur] = useState("");
    const [chargement, setChargement] = useState(false);

    // Fonction de connexion
    const handleLogin = async (e) => {
        e.preventDefault();

        setErreur("");
        setChargement(true);

        try {
            const response = await api.post("/users/login", {
                email,
                password
            });

            const { token, utilisateur } = response.data;

            // Enregistrer les informations de connexion
            localStorage.setItem("token", token);
            localStorage.setItem(
                "utilisateur",
                JSON.stringify(utilisateur)
            );

            // Rediriger vers le Dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Erreur de connexion :", error);

            setErreur(
                error.response?.data?.message ||
                "Email ou mot de passe incorrect."
            );

        } finally {
            setChargement(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>📚 Bibliothèque 2026</h1>

                <h2>Connexion</h2>

                <p>Connectez-vous à votre espace</p>

                {erreur && (
                    <div className="alert alert-danger">
                        {erreur}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label">
                            Adresse email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={chargement}
                    >
                        {chargement ? "Connexion..." : "Se connecter"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;